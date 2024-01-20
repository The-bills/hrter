use super::job::Job;
use crate::Db;
use uuid::Uuid;

pub async fn all(db: &Db) -> Vec<Job> {
    sqlx::query_as!(Job, "select * from jobs")
        .fetch_all(db)
        .await
        .unwrap()
}

pub async fn one(db: &Db, id: Uuid) -> Option<Job> {
    sqlx::query_as!(Job, "select * from jobs where id = $1", id)
        .fetch_one(db)
        .await
        .ok()
}
