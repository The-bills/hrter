use crate::hrter;
use crate::hrter::submissions::repo;
use crate::hrter_web::{AppState, Data};
use actix_web::web::Path;
use actix_web::{get, web, HttpResponse, Responder, Scope};
use uuid::Uuid;

#[get("/")]
pub async fn get_all(data: Data<AppState>, job_id: Path<Uuid>) -> impl Responder {
    HttpResponse::Ok().json(repo::all(&data.db, job_id.into_inner()).await)
}

#[get("/{id}")]
pub async fn get_one(data: Data<AppState>, id: Path<Uuid>) -> impl Responder {
    HttpResponse::Ok().json(repo::one(&data.db, id.into_inner()).await)
}

#[get("/{id}/recommendation")]
pub async fn get_recommendation(id: Path<(Uuid, Uuid)>) -> impl Responder {
    let (_, id) = id.into_inner();
    match hrter::submissions::recommendation::one(&id).await {
        Some(submission) => HttpResponse::Ok().json(submission),
        None => HttpResponse::InternalServerError().finish(),
    }
}

pub fn service() -> Scope {
    web::scope("/{job_id}/submissions")
        .service(get_all)
        .service(get_one)
        .service(get_recommendation)
}
