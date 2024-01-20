use serde_json::json;

pub async fn get_summary(content: &String) -> Result<String, ()> {
    let body = json!({
        "content": content,
    });
    let response = reqwest::Client::new()
        .post("http://127.0.0.1:8001/summarize/job")
        .json(&body)
        .send()
        .await
        .map_err(|_| ())?;

    response.text().await.map_err(|_| ())
}
