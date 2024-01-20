use super::organisation::Organisation;
use crate::Db;
use uuid::Uuid;

pub async fn all(db: &Db) -> Vec<Organisation> {
    sqlx::query_as!(Organisation, "select * from organisations")
        .fetch_all(db)
        .await
        .unwrap()
}

pub async fn one(db: &Db, id: Uuid) -> Option<Organisation> {
    sqlx::query_as!(
        Organisation,
        "select * from organisations where id = $1",
        id
    )
    .fetch_one(db)
    .await
    .ok()
}
