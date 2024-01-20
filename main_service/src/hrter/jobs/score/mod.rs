use serde_json::json;

pub async fn get_score(content: &String) -> Result<String, ()> {
    let body = json!({
        "content": content,
    });
    reqwest::Client::new()
        .post("http://127.0.0.1:8001/score/job")
        .json(&body)
        .send()
        .await
        .map_err(|_| ())?
        .text()
        .await
        .map_err(|_| ())
}
