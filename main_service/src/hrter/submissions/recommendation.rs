use crate::{
    hrter::{jobs, submissions},
    Error,
};
use chrono::{DateTime, Utc};
use futures::future::join_all;
use serde::{Deserialize, Serialize};
use std::env::var;
use uuid::Uuid;


#[derive(Serialize, Deserialize, Debug)]
pub struct Recommendation {
    pub doc_id: String,
    pub name: String,
    pub reason: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RecommendedResponse {
    pub matches: Vec<Recommendation>
}

pub async fn get_recommended(job_doc_id: &Uuid) -> Result<Vec<Recommendation>, Error> {
    let t1 = reqwest::Client::new()
        .get(
            var("LLM_SERVICE_URL").expect("LLM_SERVICE_URL env not provided")
                + "/chroma/jobs/"
                + job_doc_id.to_string().as_str()
                + "/match_precise",
        )
        .send()
        .await
        .map_err(|_| Error::LLMServiceError("match_precise"))?;

    t1.json::<RecommendedResponse>().await.map_err(|err| {
        dbg!(err);
        Error::ParsingError("match_precise")
    })
    .map(|res| res.matches)
}

pub async fn generate_recommended(job_id: Uuid) -> Result<(), Error> {
    let job_doc_id = jobs::repo::one(job_id)
        .await
        .and_then(|j| j.job_doc_id)
        .ok_or(Error::DbError)?;
    let recommended = get_recommended(&job_doc_id).await?;
    let temp = recommended
        .iter()
        .map(
            |Recommendation {
                 name,
                 doc_id: _,
                 reason,
             }| async {
                let s = submissions::repo::find(job_id, name.to_string()).await;
                match s {
                    None => None,
                    Some(submission) => match insert(&submission.id, reason).await {
                        Ok(recommended) => Some(recommended),
                        Err(_) => None,
                    },
                }
            },
        )
        .collect::<Vec<_>>();
    join_all(temp).await;
    Ok(())
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Recommended {
    pub id: Uuid,
    pub submission_id: String,
    pub reason: String,
    pub created_at: DateTime<Utc>,
}

pub async fn insert(submission_id: &Uuid, reason: &String) -> Result<Recommended, Error> {
    sqlx::query_as!(
        Recommended,
        "INSERT INTO recommended (id, submission_id, reason) VALUES ($1, $2, $3) returning *",
        Uuid::new_v4(),
        submission_id,
        reason
    )
    .fetch_one(&crate::get_db_pool().await)
    .await
    .map_err(|_| Error::DbError)
}

pub async fn one(submission_id: &Uuid) -> Option<Recommended> {
    sqlx::query_as!(
        Recommended,
        "SELECT * FROM recommended WHERE submission_id = $1",
        submission_id,
    )
    .fetch_one(&crate::get_db_pool().await)
    .await
    .ok()
}
