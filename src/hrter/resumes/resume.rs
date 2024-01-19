use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct Resume {
    pub id: Uuid,
    pub name: String,
    pub content: String,
    pub created_at: DateTime<Utc>,
}
