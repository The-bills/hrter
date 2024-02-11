use crate::hrter::resumes::{self, repo};
use crate::processing_queue::{self, ProcessingEvent};
use actix_multipart::form::{tempfile::TempFile, text::Text, MultipartForm};
use actix_web::web::Path;
use actix_web::{get, post, web, HttpResponse, Responder, Scope};
use uuid::Uuid;

#[get("/")]
pub async fn get_all() -> impl Responder {
    HttpResponse::Ok().json(repo::all().await)
}

#[get("/{id}")]
pub async fn get_one(id: Path<Uuid>) -> impl Responder {
    HttpResponse::Ok().json(repo::one(id.into_inner()).await)
}

#[post("/{id}/scores/retry")]
pub async fn retry_scores(id: Path<Uuid>) -> impl Responder {
    match resumes::process_scores(id.into_inner()).await {
        Ok(resume) => HttpResponse::Ok().json(resume),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

#[post("/{id}/summary/retry")]
pub async fn retry_summary(id: Path<Uuid>) -> impl Responder {
    match resumes::process_summary(id.into_inner()).await {
        Ok(resume) => HttpResponse::Ok().json(resume),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

#[get("/{id}/summary/status")]
pub async fn summary_status(id_path: Path<Uuid>) -> impl Responder {
    let id = id_path.into_inner();
    match processing_queue::check(ProcessingEvent::ResumeSummary(id)) {
        Some(_) => HttpResponse::Ok().json(true),
        None => HttpResponse::Ok().json(false),
    }
}

#[get("/{id}/scores/status")]
pub async fn scores_status(id_path: Path<Uuid>) -> impl Responder {
    let id = id_path.into_inner();
    match processing_queue::check(ProcessingEvent::ResumeSummary(id)) {
        Some(_) => HttpResponse::Ok().json(true),
        None => HttpResponse::Ok().json(false),
    }
}

#[derive(MultipartForm, Debug)]
pub struct PostResumeForm {
    file: TempFile,
    name: Text<String>,
}

#[post("/")]
pub async fn insert(MultipartForm(form): MultipartForm<PostResumeForm>) -> impl Responder {
    const MAX_FILE_SIZE: usize = 1024 * 1024 * 10;

    match form.file.size {
        0 => return HttpResponse::BadRequest().finish(),
        size if size > MAX_FILE_SIZE => return HttpResponse::BadRequest().finish(),
        _ => {}
    };

    let temp_file_path = form.file.file.path();
    let txt: String = pdf_extract::extract_text(&temp_file_path).unwrap();

    match resumes::process(
        txt,
        Uuid::parse_str("13868a7c-00e9-4e21-960e-5c14b1045d12").unwrap(),
        form.name.into_inner(),
    )
    .await
    {
        Ok(res) => HttpResponse::Ok().json(res),
        Err(err) => {
            dbg!(err);
            HttpResponse::InternalServerError().finish()
        }
    }
}

pub fn service() -> Scope {
    web::scope("/resumes")
        .service(get_all)
        .service(get_one)
        .service(insert)
        .service(retry_summary)
        .service(retry_scores)
        .service(summary_status)
        .service(scores_status)
}
