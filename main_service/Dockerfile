FROM rust:1.75

COPY ./Cargo.lock ./Cargo.lock
COPY ./Cargo.toml ./Cargo.toml
COPY ./src ./src
COPY ./.sqlx ./.sqlx

RUN cargo build
CMD ["./target/debug/main_service"] 