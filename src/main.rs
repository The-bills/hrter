mod hrter;
mod hrter_web;

use dotenv::dotenv;
pub type Db = hrter_web::Db;

#[tokio::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    hrter_web::serve().await
}
