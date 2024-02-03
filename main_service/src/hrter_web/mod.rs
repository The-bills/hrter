use actix_web::{web::Data, App, HttpServer};
use dotenv::dotenv;
use sqlx::{postgres::PgPoolOptions, Pool, Postgres};
mod api;

use actix_cors::Cors;

pub type Db = Pool<Postgres>;
pub struct AppState {
    db: Db,
}

pub async fn serve() -> std::io::Result<()> {
    dotenv().ok();

    let db_url = std::env::var("DATABASE_URL").unwrap();
    let db_pool = PgPoolOptions::new()
        .max_connections(20)
        .connect(&db_url)
        .await
        .unwrap();
    HttpServer::new(move || {
        let cors = Cors::permissive();

        App::new()
            .app_data(Data::new(AppState {
                db: db_pool.clone(),
            }))
            .wrap(cors)
            .service(api::service())
    })
    .bind(("127.0.0.1", 8000))?
    .run()
    .await
}
