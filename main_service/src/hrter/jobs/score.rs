use serde_json::{json, Value};
use std::env::var;
use uuid::Uuid;

use crate::Error;

use super::{repo, Job};

pub async fn get_score(content: &String) -> Result<Value, Error> {
    let body = json!({
        "content": content,
    });
    reqwest::Client::new()
        .post(var("LLM_SERVICE_URL").expect("LLM_SERVICE_URL env not provided") + "/score/job")
        .json(&body)
        .send()
        .await
        .map_err(|_| Error::LLMServiceError("score_job"))?
        .json::<Value>()
        .await
        .map_err(|_| Error::ParsingError("score_job"))
}

pub async fn generate_score(id: Uuid) -> Result<Job, Error> {
    let scores = super::get_score(id).await?;
    repo::udpate_scores(id, Some(scores)).await
}
