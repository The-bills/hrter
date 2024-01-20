pub mod job;
pub mod repo;
pub mod score;
pub mod summary;

use crate::Db;
use uuid::Uuid;

pub async fn get_summary(db: &Db, id: Uuid) -> Result<String, ()> {
    let job = repo::one(db, id).await.unwrap();
    summary::get_summary(&job.description).await
}

pub async fn get_score(db: &Db, id: Uuid) -> Result<String, ()> {
    let job = repo::one(db, id).await.unwrap();
    score::get_score(&job.description).await
}
