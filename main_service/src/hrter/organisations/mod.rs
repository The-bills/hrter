use self::organisation::Organisation;
use crate::Error;

pub mod organisation;
pub mod repo;

pub async fn get_default() -> Result<Organisation, Error> {
    match repo::all().await.into_iter().next() {
        Some(org) => Ok(org),
        None => Err(Error::DbError),
    }
}
