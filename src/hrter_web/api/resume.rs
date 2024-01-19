use crate::hrter::resumes::repo;
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

pub fn service() -> Scope {
    web::scope("/resumes").service(get_all).service(get_one)
}
