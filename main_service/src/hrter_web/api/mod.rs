mod jobs;
mod organisations;
mod resume;

use actix_web::{get, web, HttpResponse, Responder, Scope};
use serde::Serialize;

use crate::processing_queue;

#[get("/status")]
pub async fn status_check() -> impl Responder {
    "live"
}

#[get("/processing_queue")]
pub async fn processing_events() -> impl Responder {
    let res = processing_queue::to_vec();
    HttpResponse::Ok().json(res)
}

#[derive(Serialize)]
struct Stats {
    new_resumes: i32,
    total_resumes: i32,
    open_jobs: i32,
    open_recommendations: i32
}

// #[get("/stats")]
// pub async fn stats() -> impl Responder {
//     todo!();
// }

pub fn service() -> Scope {
    web::scope("/api")
        .service(status_check)
        .service(processing_events)
        .service(organisations::service())
        .service(jobs::service())
        .service(resume::service())
}
