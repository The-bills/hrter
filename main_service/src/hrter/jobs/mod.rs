mod job;
pub mod llm;
pub mod repo;
pub mod score;
pub mod summary;

pub use job::Job;
use serde_json::Value;
use uuid::Uuid;

use crate::Error;

use super::organisations;

pub async fn get_summary(id: Uuid) -> Result<String, Error> {
    let job = repo::one(id).await.unwrap();
    summary::get_summary(&job.description).await
}

pub async fn get_score(id: Uuid) -> Result<Value, Error> {
    let job = repo::one(id).await.unwrap();
    score::get_score(&job.description).await
}

pub async fn new(name: &String, description: &String) -> Result<Job, Error> {
    let org = organisations::get_default().await?;
    let job = repo::insert(name, description, &org.id).await?;
    let job = summary::generate_summary(job.id).await?;
    let job = score::generate_score(job.id).await?;
    let res = llm::insert_job_to_llm(&job.summary.unwrap(), &job.scores.unwrap()).await?;
    let job = repo::udpate_job_doc_id(job.id, &res.job_doc_id).await?;
    Ok(job)
}
