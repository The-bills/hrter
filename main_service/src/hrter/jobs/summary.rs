use super::{repo, Job};
use crate::Db;
use serde_json::json;
use uuid::Uuid;
use std::env::var;

pub async fn get_summary(content: &String) -> Result<String, ()> {
    let body = json!({
        "content": content,
    });
    reqwest::Client::new()
        .post(var("LLM_SERVICE_URL").expect("LLM_SERVICE_URL env not provided") + "/summarize/job")
        .json(&body)
        .send()
        .await
        .map_err(|_| ())?
        .text()
        .await
        .map_err(|_| ())
}

pub async fn generate_summary(db: &Db, id: Uuid) -> Result<Job, ()> {
    let summary = super::get_summary(db, id).await?;
    repo::udpate_summary(db, id, Some(summary)).await
}
