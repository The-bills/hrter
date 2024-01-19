use super::submission::Submission;
use crate::Db;
use uuid::Uuid;

pub async fn all(db: &Db) -> Vec<Submission> {
    sqlx::query_as!(Submission, "select * from submissions")
        .fetch_all(db)
        .await
        .unwrap()
}

pub async fn one(db: &Db, id: Uuid) -> Option<Submission> {
    sqlx::query_as!(Submission, "select * from submissions where id = $1", id)
        .fetch_one(db)
        .await
        .ok()
}
