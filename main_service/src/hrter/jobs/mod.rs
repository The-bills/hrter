mod job;
pub mod repo;
pub mod score;
pub mod summary;

pub use job::Job;
use uuid::Uuid;

pub async fn get_summary(id: Uuid) -> Result<String, ()> {
    let job = repo::one(id).await.unwrap();
    summary::get_summary(&job.description).await
}

pub async fn get_score(id: Uuid) -> Result<String, ()> {
    let job = repo::one(id).await.unwrap();
    score::get_score(&job.description).await
}
