use crate::hrter::organisations::repo;
use actix_web::web::Path;
use actix_web::{get, web, HttpResponse, Responder, Scope};
use uuid::Uuid;

#[get("/")]
pub async fn get_all() -> impl Responder {
    HttpResponse::Ok().json(repo::all().await)
}

#[get("/{id}")]
pub async fn get_one(id: Path<Uuid>) -> impl Responder {
    HttpResponse::Ok().json(repo::one(id.into_inner()).await)
}

pub fn service() -> Scope {
    web::scope("/organisations")
        .service(get_all)
        .service(get_one)
}
