use serde_json::json;
use std::env::var;

pub async fn get_score(content: &String) -> Result<String, ()> {
    let body = json!({
        "content": content,
    });
    reqwest::Client::new()
        .post(var("LLM_SERVICE_URL").expect("LLM_SERVICE_URL env not provided") + "/score/job")
        .json(&body)
        .send()
        .await
        .map_err(|_| ())?
        .text()
        .await
        .map_err(|_| ())
}
