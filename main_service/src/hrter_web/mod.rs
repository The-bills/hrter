use crate::get_db_pool;
use actix_web::{web::Data, App, HttpServer};
use dotenv::dotenv;
use sqlx::{Pool, Postgres};
mod api;

use actix_cors::Cors;

pub type Db = Pool<Postgres>;
pub struct AppState {
    db: Db,
}

pub async fn serve() -> std::io::Result<()> {
    dotenv().ok();
    print!("Starting server");
    let pool = get_db_pool().await;

    HttpServer::new(move || {
        let cors = Cors::permissive();

        App::new()
            .app_data(Data::new(AppState { db: pool.clone() }))
            .wrap(cors)
            .service(api::service())
    })
    .bind(("0.0.0.0", 8000))?
    .run()
    .await
}
