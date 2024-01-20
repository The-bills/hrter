use crate::hrter::jobs::{self, repo};
use crate::hrter_web::{AppState, Data};
use actix_web::web::Path;
use actix_web::{get, web, HttpResponse, Responder, Scope};
use uuid::Uuid;

#[get("/")]
pub async fn get_all(data: Data<AppState>) -> impl Responder {
    HttpResponse::Ok().json(repo::all(&data.db).await)
}

#[get("/{id}")]
pub async fn get_one(data: Data<AppState>, id: Path<Uuid>) -> impl Responder {
    HttpResponse::Ok().json(repo::one(&data.db, id.into_inner()).await)
}

#[get("/{id}/summary")]
pub async fn get_summary(data: Data<AppState>, id: Path<Uuid>) -> impl Responder {
    match jobs::get_summary(&data.db, id.into_inner()).await {
        Ok(summary) => HttpResponse::Ok().json(summary),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

#[get("/{id}/score")]
pub async fn get_score(data: Data<AppState>, id: Path<Uuid>) -> impl Responder {
    match jobs::get_score(&data.db, id.into_inner()).await {
        Ok(summary) => HttpResponse::Ok().json(summary),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

pub fn service() -> Scope {
    web::scope("/jobs")
        .service(get_all)
        .service(get_one)
        .service(get_summary)
        .service(get_score)
}
