use crate::Error;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use std::env::var;
use uuid::Uuid;

#[derive(Serialize, Deserialize, Debug)]
pub struct InsertResponse {
    pub job_doc_id: Uuid,
}
pub async fn insert_job_to_llm(summary: &String, scores: &Value) -> Result<InsertResponse, Error> {
    let body = json!({
        "content": summary,
        "scores": scores
    });
    reqwest::Client::new()
        .post(var("LLM_SERVICE_URL").expect("LLM_SERVICE_URL env not provided") + "/chroma/jobs")
        .json(&body)
        .send()
        .await
        .map_err(|_| Error::LLMServiceError("insert_job"))?
        .json::<InsertResponse>()
        .await
        .map_err(|_| Error::ParsingError("insert_job"))
}
