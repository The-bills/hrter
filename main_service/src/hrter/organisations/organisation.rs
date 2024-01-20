use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct Organisation {
    pub id: Uuid,
    pub name: String,
    pub created_at: DateTime<Utc>,
}
