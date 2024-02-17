use super::Job;
use crate::Db;
use uuid::Uuid;

pub async fn all(db: &Db) -> Vec<Job> {
    sqlx::query_as!(Job, "select * from jobs")
        .fetch_all(db)
        .await
        .unwrap()
}

pub async fn one(id: Uuid) -> Option<Job> {
    sqlx::query_as!(Job, "select * from jobs where id = $1", id)
        .fetch_one(&crate::get_db_pool().await)
        .await
        .ok()
}

pub async fn udpate_summary(db: &Db, id: Uuid, summary: Option<String>) -> Result<Job, ()> {
    sqlx::query_as!(
        Job,
        "update jobs set summary = $1 where id = $2 returning *",
        summary,
        id
    )
    .fetch_one(db)
    .await
    .map_err(|_| ())
}
