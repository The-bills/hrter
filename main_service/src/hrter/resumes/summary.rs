use crate::Error;
use serde_json::json;
use std::env::var;

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
        .text()
        .await
        .map_err(|_| Error::ParsingError("summarize_resume"))
}
