use super::{repo, Job};
use crate::Db;
use serde_json::json;
use uuid::Uuid;

pub async fn get_summary(content: &String) -> Result<String, ()> {
    let body = json!({
        "content": content,
    });
    reqwest::Client::new()
        .post("http://127.0.0.1:8001/summarize/job")
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