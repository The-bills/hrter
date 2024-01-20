mod jobs;
mod organisations;
mod resume;
mod submissions;

use actix_web::{get, web, HttpResponse, Responder, Scope};

#[get("/status")]
pub async fn status_check() -> impl Responder {
    "live"
}

pub fn service() -> Scope {
    web::scope("/api")
        .service(status_check)
        .service(organisations::service())
        .service(jobs::service())
        .service(resume::service())
        .service(submissions::service())
}
