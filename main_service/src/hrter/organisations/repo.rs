use super::organisation::Organisation;
use uuid::Uuid;

pub async fn all() -> Vec<Organisation> {
    sqlx::query_as!(Organisation, "select * from organisations")
        .fetch_all(&crate::get_db_pool().await)
        .await
        .unwrap()
}

pub async fn one(id: Uuid) -> Option<Organisation> {
    sqlx::query_as!(
        Organisation,
        "select * from organisations where id = $1",
        id
    )
    .fetch_one(&crate::get_db_pool().await)
    .await
    .ok()
}
