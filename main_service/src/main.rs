mod hrter;
mod hrter_web;
mod processing_queue;

pub use processing_queue::PROCESSING_QUEUE;
use sqlx::{postgres::PgPoolOptions, Pool, Postgres};
use std::sync::OnceLock;

#[derive(Debug)]
pub enum Error {
    LLMServiceError(&'static str),
    ParsingError(&'static str),
    DbError,
}

use dotenv::dotenv;
pub type Db = hrter_web::Db;

static DB_POOL: OnceLock<Pool<Postgres>> = OnceLock::new();
async fn get_db_pool() -> Pool<Postgres> {
    DB_POOL.get().unwrap().clone()
}

#[tokio::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    let db_url = std::env::var("DATABASE_URL").unwrap();
    let db_pool = PgPoolOptions::new()
        .max_connections(20)
        .connect(&db_url)
        .await
        .unwrap();
    let _ = DB_POOL.set(db_pool);
    let _ = processing_queue::init();

    hrter_web::serve().await
}
