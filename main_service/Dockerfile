# Rust as the base image
FROM rust:1.75

# 1. Create a new empty shell project
RUN USER=root cargo new --bin main_service
WORKDIR /main_service

# 2. Copy our manifests
COPY ./Cargo.lock ./Cargo.lock
COPY ./Cargo.toml ./Cargo.toml
COPY ./.sqlx ./.sqlx

# 3. Build only the dependencies to cache them
RUN cargo build --release
RUN rm src/*.rs

# 4. Now that the dependency is built, copy your source code
COPY ./src ./src

# 5. Build for release.
RUN rm ./target/release/deps/main_service*
RUN cargo install --path .

CMD ["main_service"]