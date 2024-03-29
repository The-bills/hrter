use crate::hrter;
use crate::hrter::jobs::{self, repo};
use actix_web::web::Path;
use actix_web::{get, post, web, HttpResponse, Responder, Scope};
use serde::Deserialize;
use uuid::Uuid;

mod submissions;

#[get("/")]
pub async fn get_all() -> impl Responder {
    HttpResponse::Ok().json(repo::all().await)
}

#[derive(Deserialize)]
pub struct NewJobBody {
    name: String,
    description: String,
}

#[post("/")]
pub async fn new(body: web::Json<NewJobBody>) -> impl Responder {
    match hrter::jobs::new(&body.name, &body.description).await {
        Ok(job) => HttpResponse::Ok().json(job),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

#[get("/{id}")]
pub async fn get_one(id: Path<Uuid>) -> impl Responder {
    HttpResponse::Ok().json(repo::one(id.into_inner()).await)
}

#[post("/{id}/summary")]
pub async fn generate_summary(id: Path<Uuid>) -> impl Responder {
    match jobs::summary::generate_summary(id.into_inner()).await {
        Ok(job) => HttpResponse::Ok().json(job),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

#[get("/{id}/score")]
pub async fn get_score(id: Path<Uuid>) -> impl Responder {
    match jobs::get_score(id.into_inner()).await {
        Ok(summary) => HttpResponse::Ok().json(summary),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

#[get("/{id}/recommended")]
pub async fn get_recommended(id: Path<Uuid>) -> impl Responder {
    let res = hrter::submissions::repo::all_recommended(&id.into_inner()).await;
    HttpResponse::Ok().json(res)
}

#[post("/{id}/recommended/generate")]
pub async fn generate_recommended(id: Path<Uuid>) -> impl Responder {
    match hrter::submissions::recommendation::generate_recommended(id.into_inner()).await {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

pub fn service() -> Scope {
    web::scope("/jobs")
        .service(submissions::service())
        .service(get_all)
        .service(get_one)
        .service(generate_summary)
        .service(get_score)
        .service(get_recommended)
        .service(generate_recommended)
        .service(new)
}
