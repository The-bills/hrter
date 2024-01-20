pub mod repo;
pub mod resume;
pub mod score;
pub mod summary;

use crate::Db;
use uuid::Uuid;

pub async fn get_summary(db: &Db, id: Uuid) -> Result<String, ()> {
    let resume = repo::one(db, id).await.unwrap();
    summary::get_summary(&resume.content).await
}

pub async fn get_score(db: &Db, id: Uuid) -> Result<String, ()> {
    let resume = repo::one(db, id).await.unwrap();
    score::get_score(&resume.content).await
}
