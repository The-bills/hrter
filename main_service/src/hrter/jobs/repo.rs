use super::Job;
use crate::Error;
use serde_json::Value;
use uuid::Uuid;

pub async fn all() -> Vec<Job> {
    sqlx::query_as!(Job, "select * from jobs")
        .fetch_all(&crate::get_db_pool().await)
        .await
        .unwrap()
}

pub async fn one(id: Uuid) -> Option<Job> {
    sqlx::query_as!(Job, "select * from jobs where id = $1", id)
        .fetch_one(&crate::get_db_pool().await)
        .await
        .ok()
}

pub async fn insert(
    name: &String,
    description: &String,
    organisation_id: &Uuid,
) -> Result<Job, Error> {
    sqlx::query_as!(
        Job,
        "INSERT INTO jobs (id, name, description, organisation_id) VALUES ($1, $2, $3, $4) returning *",
        Uuid::new_v4(),
        name,
        description,
        organisation_id
    )
    .fetch_one(&crate::get_db_pool().await)
    .await
    .map_err(|_| Error::DbError)
}

pub async fn udpate_summary(id: Uuid, summary: Option<String>) -> Result<Job, Error> {
    sqlx::query_as!(
        Job,
        "update jobs set summary = $1 where id = $2 returning *",
        summary,
        id
    )
    .fetch_one(&crate::get_db_pool().await)
    .await
    .map_err(|_| Error::DbError)
}
pub async fn udpate_scores(id: Uuid, scores: Option<Value>) -> Result<Job, Error> {
    sqlx::query_as!(
        Job,
        "update jobs set scores = $1 where id = $2 returning *",
        scores,
        id
    )
    .fetch_one(&crate::get_db_pool().await)
    .await
    .map_err(|_| Error::DbError)
}

pub async fn udpate_job_doc_id(id: Uuid, job_doc_id: &Uuid) -> Result<Job, Error> {
    sqlx::query_as!(
        Job,
        "update jobs set job_doc_id = $1 where id = $2 returning *",
        job_doc_id,
        id
    )
    .fetch_one(&crate::get_db_pool().await)
    .await
    .map_err(|_| Error::DbError)
}
