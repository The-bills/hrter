use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct Submission {
    pub id: Uuid,
    pub created_at: DateTime<Utc>,
    pub resume_id: Uuid,
    pub job_id: Uuid,
    pub chroma_distance: Option<f64>,
}
