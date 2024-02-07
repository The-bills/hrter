pub mod repo;
pub mod resume;
pub mod score;
pub mod summary;

use crate::{Error, Db};
use resume::Resume;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use uuid::Uuid;
use super::submissions;
use std::env::var;

#[derive(Serialize, Deserialize, Debug)]
pub struct InsertResponse {
    pub resume_doc_id: Uuid,
    pub chroma_distance: f64,
}
pub async fn insert_summary_to_llm(
    summary: &String,
    scores: &Value,
) -> Result<InsertResponse, Error> {
    let body = json!({
        "content": summary,
        "scores": scores
    });
    reqwest::Client::new()
        .post(var("LLM_SERVICE_URL").expect("LLM_SERVICE_URL env not provided") + "/chroma/jobs" + "/1da3f2fb-2973-4e6e-837c-678080035046" + "/resume")
        .json(&body)
        .send()
        .await
        .map_err(|_| Error::LLMServiceError("insert_job"))?
        .json::<InsertResponse>()
        .await
        .map_err(|_| Error::ParsingError("insert_job"))
}

pub async fn insert(db: &Db, content: String, job_id: Uuid, name: String) -> Result<Resume, Error> {
    let resume = repo::insert(db, &content, &name).await?;

    let summary = summary::get_summary(&content).await?;
    let resume = repo::put_summary(db, &resume.id, &summary).await?;

    let scores = score::get_score(&content).await?;
    let resume = repo::put_scores(db, &resume.id, &scores).await?;

    let InsertResponse {
        resume_doc_id,
        chroma_distance,
    } = insert_summary_to_llm(&summary, &scores).await?;

    submissions::repo::insert(db, resume.id, job_id, chroma_distance).await?;
    let resume = repo::put_resume_doc_id(db, &resume.id, &resume_doc_id).await?;

    Ok(resume)
}
