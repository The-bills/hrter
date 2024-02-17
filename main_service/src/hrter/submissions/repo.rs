use super::submission::Submission;
use crate::Db;
use crate::Error;
use uuid::Uuid;

pub async fn all(db: &Db, job_id: Uuid) -> Vec<Submission> {
    sqlx::query_as!(
        Submission,
        "select * from submissions where job_id = $1 order by chroma_distance asc",
        job_id
    )
    .fetch_all(db)
    .await
    .unwrap()
}

pub async fn all_recommended(job_id: &Uuid) -> Vec<Submission> {
    sqlx::query_as!(
        Submission,
        r#"
        SELECT s.* from submissions s
        LEFT JOIN recommended r ON r.submission_id = s.id
        WHERE r.id is not null and job_id = $1
        ORDER BY chroma_distance desc
        "#,
        job_id
    )
    .fetch_all(&crate::get_db_pool().await)
    .await
    .unwrap()
}

pub async fn one(db: &Db, id: Uuid) -> Option<Submission> {
    sqlx::query_as!(Submission, "select * from submissions where id = $1", id)
        .fetch_one(db)
        .await
        .ok()
}

pub async fn find(job_id: Uuid, name: String) -> Option<Submission> {
    sqlx::query_as!(
        Submission,
        "select s.* from submissions s left join resumes r on r.id = s.resume_id where s.job_id = $1 and r.name = $2 limit 1",
        job_id,
        name
    )
    .fetch_one(&crate::get_db_pool().await)
    .await
    .ok()
}

pub async fn insert(
    resume_id: Uuid,
    job_id: Uuid,
    chroma_distance: f64,
) -> Result<Submission, Error> {
    sqlx::query_as!(Submission,
        "INSERT INTO submissions (id, resume_id, job_id, chroma_distance) VALUES ($1, $2, $3, $4) returning *",
        Uuid::new_v4(),
        resume_id,
        job_id,
        chroma_distance
    ).fetch_one(&crate::get_db_pool().await).await.map_err(|_| Error::DbError)
}
