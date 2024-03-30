use super::{repo, Job};
use crate::Error;
use serde::{Deserialize, Serialize};
use serde_json::json;
use std::env::var;
use uuid::Uuid;

#[derive(Serialize, Deserialize, Debug)]
pub struct Response {
    pub summary: String
}

pub async fn get_summary(content: &String) -> Result<String, Error> {
    let body = json!({
        "content": content,
    });
    reqwest::Client::new()
        .post(var("LLM_SERVICE_URL").expect("LLM_SERVICE_URL env not provided") + "/summarize/job")
        .json(&body)
        .send()
        .await
        .map_err(|_| Error::LLMServiceError("summary_job"))?
        .json::<Response>()
        .await
        .map(|res| res.summary)
        .map_err(|_| Error::ParsingError("summary_job"))
}

pub async fn generate_summary(id: Uuid) -> Result<Job, Error> {
    let summary = super::get_summary(id).await?;
    repo::udpate_summary(id, Some(summary)).await
}
