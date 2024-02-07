FROM rust:1.75

COPY ./Cargo.lock ./Cargo.lock
COPY ./Cargo.toml ./Cargo.toml
COPY ./.env ./.env

COPY ./src ./src

COPY ./.sqlx ./.sqlx

# RUN rm ./target/release/deps/main_service*
RUN cargo build

CMD ["./target/debug/main_service"] 