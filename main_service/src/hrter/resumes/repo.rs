use super::resume::Resume;
use crate::Db;
use serde_json::Value;
use uuid::Uuid;
use crate::Error;

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

pub async fn insert(db: &Db, content: &String, name: &String) -> Result<Resume, Error> {
    sqlx::query_as!(
        Resume,
        "INSERT INTO resumes (id, name, content) VALUES ($1, $2, $3) returning *",
        Uuid::new_v4(),
        name,
        content,
    )
    .fetch_one(db)
    .await
    .map_err(|_| Error::DbError)
}

pub async fn put_summary(db: &Db, id: &Uuid, summary: &String) -> Result<Resume, Error> {
    sqlx::query_as!(
        Resume,
        "UPDATE resumes SET summary = $1 WHERE id = $2 RETURNING *;",
        summary,
        id
    )
    .fetch_one(db)
    .await
    .map_err(|_| Error::DbError)
}

pub async fn put_scores(db: &Db, id: &Uuid, scores: &Value) -> Result<Resume, Error> {
    sqlx::query_as!(
        Resume,
        "UPDATE resumes SET scores = $1 WHERE id = $2 RETURNING *;",
        scores,
        id
    )
    .fetch_one(db)
    .await
    .map_err(|_| Error::DbError)
}

pub async fn put_resume_doc_id(db: &Db, id: &Uuid, resume_doc_id: &Uuid) -> Result<Resume, Error> {
    sqlx::query_as!(
        Resume,
        "UPDATE resumes SET resume_doc_id = $1 WHERE id = $2 RETURNING *;",
        resume_doc_id,
        id
    )
    .fetch_one(db)
    .await
    .map_err(|_| Error::DbError)
}
