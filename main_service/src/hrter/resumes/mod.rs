pub mod llm;
pub mod repo;
pub mod resume;
pub mod score;
pub mod summary;

use super::submissions;
use crate::processing_queue::{self, ProcessingEvent};
use crate::Error;
use resume::Resume;
use uuid::Uuid;

pub async fn process_summary(id: Uuid) -> Result<Resume, Error> {
    processing_queue::push(ProcessingEvent::ResumeSummary(id));
    let action = || async {
        let resume = repo::one(id).await.ok_or(Error::DbError)?;
        let summary = summary::get_summary(&resume.content).await?;
        repo::put_summary(&resume.id, &summary).await
    };
    action().await.map(|res| {
        processing_queue::pop(ProcessingEvent::ResumeSummary(id));
        res
    })
}

pub async fn process_scores(id: Uuid) -> Result<Resume, Error> {
    processing_queue::push(ProcessingEvent::ResumeScores(id));
    let action = || async {
        let resume = repo::one(id).await.ok_or(Error::DbError)?;
        let scores = score::get_score(&resume.content).await?;
        repo::put_scores(&resume.id, &scores).await
    };
    action().await.map(|res| {
        processing_queue::pop(ProcessingEvent::ResumeScores(id));
        res
    })
}

pub async fn process(content: String, job_id: Uuid, name: String) -> Result<Resume, Error> {
    let resume = repo::insert(&content, &name).await?;

    tokio::spawn(async move {
        let summary = process_summary(resume.id).await.unwrap().summary.unwrap();
        let scores = process_scores(resume.id).await.unwrap().scores.unwrap();

        let llm::InsertResponse {
            resume_doc_id,
            chroma_distance,
        } = llm::insert_summary_to_llm(&summary, &scores).await.unwrap();
        submissions::repo::insert(resume.id, job_id, chroma_distance)
            .await
            .unwrap();
        repo::put_resume_doc_id(&resume.id, &resume_doc_id)
            .await
            .unwrap();
    });

    Ok(resume)
}
