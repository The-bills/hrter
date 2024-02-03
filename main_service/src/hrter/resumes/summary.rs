use crate::Error;
use serde_json::json;

pub async fn get_summary(content: &String) -> Result<String, Error> {
    let body = json!({
        "content": content,
    });
    reqwest::Client::new()
        .post("http://localhost:8001/summarize/resume")
        .json(&body)
        .send()
        .await
        .map_err(|_| Error::LLMServiceError("summarize_resume"))?.text().await.map_err(|_| Error::ParsingError("summarize_resume"))
}
