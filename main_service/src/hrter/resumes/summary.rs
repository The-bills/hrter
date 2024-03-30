use crate::Error;
use serde::{Deserialize, Serialize};
use serde_json::json;
use std::env::var;

#[derive(Serialize, Deserialize, Debug)]
pub struct SummaryResponse {
    pub summary: String
}

pub async fn get_summary(content: &String) -> Result<String, Error> {
    let body = json!({
        "content": content,
    });
    reqwest::Client::new()
        .post(
            var("LLM_SERVICE_URL").expect("LLM_SERVICE_URL env not provided") + "/summarize/resume",
        )
        .json(&body)
        .send()
        .await
        .map_err(|_| Error::LLMServiceError("summarize_resume"))?
        .json::<SummaryResponse>()
        .await
        .map_err(|_| Error::ParsingError("summarize_resume"))
        .map(|res| res.summary)
}
