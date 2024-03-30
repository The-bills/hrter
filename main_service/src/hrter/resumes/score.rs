use serde::Deserialize;
use serde::Serialize;
use serde_json::json;
use serde_json::Value;
use std::env::var;

use crate::Error;

#[derive(Serialize, Deserialize, Debug)]
pub struct Response {
    pub scores: Value
}

pub async fn get_score(content: &String) -> Result<Value, Error> {
    let body = json!({
        "content": content,
    });
    reqwest::Client::new()
        .post(var("LLM_SERVICE_URL").expect("LLM_SERVICE_URL env not provided") + "/score/resume")
        .json(&body)
        .send()
        .await
        .map_err(|_| Error::LLMServiceError("score_resume"))?
        .json::<Response>()
        .await
        .map(|res| res.scores)
        .map_err(|_| Error::ParsingError("score_resume"))
}
