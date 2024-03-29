use crate::Error;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use std::env::var;
use uuid::Uuid;

#[derive(Serialize, Deserialize, Debug)]
pub struct InsertResponse {
    pub resume_doc_id: Uuid,
    pub chroma_distance: f64,
}
pub async fn insert_summary_to_llm(
    summary: &String,
    scores: &Value,
    job_doc_id: &Uuid,
) -> Result<InsertResponse, Error> {
    let body = json!({
        "content": summary,
        "scores": scores
    });
    reqwest::Client::new()
        .post(
            var("LLM_SERVICE_URL").expect("LLM_SERVICE_URL env not provided")
                + "/chroma/jobs/"
                + job_doc_id.to_string().as_str()
                + "/resume",
        )
        .json(&body)
        .send()
        .await
        .map_err(|_| Error::LLMServiceError("insert_job"))?
        .json::<InsertResponse>()
        .await
        .map_err(|_| Error::ParsingError("insert_job"))
}
