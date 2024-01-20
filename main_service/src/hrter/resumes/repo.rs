use super::resume::Resume;
use crate::Db;
use uuid::Uuid;

pub async fn all(db: &Db) -> Vec<Resume> {
    sqlx::query_as!(Resume, "select * from resumes")
        .fetch_all(db)
        .await
        .unwrap()
}

pub async fn one(db: &Db, id: Uuid) -> Option<Resume> {
    sqlx::query_as!(Resume, "select * from resumes where id = $1", id)
        .fetch_one(db)
        .await
        .ok()
}
