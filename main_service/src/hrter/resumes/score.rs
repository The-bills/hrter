use serde_json::json;
use serde_json::Value;
use std::env::var;

use crate::Error;

type ScoreResponse = Value;

pub async fn get_score(content: &String) -> Result<ScoreResponse, Error> {
    let body = json!({
        "content": content,
    });
    reqwest::Client::new()
        .post(var("LLM_SERVICE_URL").expect("LLM_SERVICE_URL env not provided") + "/score/resume")
        .json(&body)
        .send()
        .await
        .map_err(|_| Error::LLMServiceError("score_resume"))?
        .json::<ScoreResponse>()
        .await
        .map_err(|_| Error::ParsingError("score_resume"))
}
