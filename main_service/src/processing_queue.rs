use std::{
    collections::HashSet,
    sync::{Mutex, OnceLock},
};

use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Hash, Eq, PartialEq, Debug, Serialize, Deserialize, Clone)]
pub enum ProcessingEvent {
    ResumeSummary(Uuid),
    ResumeScores(Uuid),
}

type ProcessingQueueType = Mutex<HashSet<ProcessingEvent>>;
pub static PROCESSING_QUEUE: OnceLock<ProcessingQueueType> = OnceLock::new();

pub fn push(event: ProcessingEvent) {
    let mutex = PROCESSING_QUEUE.get().unwrap();
    mutex.lock().unwrap().insert(event);
}

pub fn pop(event: ProcessingEvent) -> Option<ProcessingEvent> {
    let mutex = PROCESSING_QUEUE.get().unwrap();
    mutex.lock().unwrap().take(&event)
}

pub fn check(event: ProcessingEvent) -> Option<ProcessingEvent> {
    let mutex = PROCESSING_QUEUE.get().unwrap();
    mutex.lock().unwrap().get(&event).map(|e| e.clone())
}

pub fn init() -> Result<(), ProcessingQueueType> {
    PROCESSING_QUEUE.set(Mutex::new(HashSet::new()))
}

pub fn to_vec() -> Vec<ProcessingEvent> {
    let queue = PROCESSING_QUEUE.get().unwrap().lock().unwrap();
    queue.iter().map(|e| e.clone()).collect::<Vec<_>>()
}
