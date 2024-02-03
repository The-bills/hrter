use crate::hrter::resumes::{self, repo};
use crate::hrter_web::{AppState, Data};
use actix_web::web::Path;
use actix_web::{get, post, web, HttpResponse, Responder, Scope};
use uuid::Uuid;
use actix_multipart::form::{tempfile::TempFile, text::Text, MultipartForm};

#[get("/")]
pub async fn get_all(data: Data<AppState>) -> impl Responder {
    HttpResponse::Ok().json(repo::all(&data.db).await)
}

#[get("/{id}")]
pub async fn get_one(data: Data<AppState>, id: Path<Uuid>) -> impl Responder {
    HttpResponse::Ok().json(repo::one(&data.db, id.into_inner()).await)
}

#[derive(MultipartForm, Debug)]
pub struct PostResumeForm {
    file: TempFile,
    name: Text<String>
}

#[post("/")]
pub async fn insert(MultipartForm(form): MultipartForm<PostResumeForm>, data: Data<AppState>) -> impl Responder {
    const MAX_FILE_SIZE: usize = 1024 * 1024 * 10;

    // let namespace = form.name.into_inner();
    // let file = form.file;

    match form.file.size {
        0 => return HttpResponse::BadRequest().finish(),
        size if size > MAX_FILE_SIZE => return HttpResponse::BadRequest().finish(),
        _ => {}
    };

    let temp_file_path = form.file.file.path();
    let txt: String = pdf_extract::extract_text(&temp_file_path).unwrap();

    match resumes::insert(
        &data.db,
        txt,
        Uuid::parse_str("13868a7c-00e9-4e21-960e-5c14b1045d12").unwrap(),
        form.name.into_inner()
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
}
