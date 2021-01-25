## Basic Auth Demo

### Usage

The application is ready to used as soon as cloned locally, just need to run a `docker-compose up` from the root folder of the project.

In case of failure during either the docker-compose build or one of the Dockerfile build, it was run locally under the following environment:
 - docker-compose version 1.27.4, build 40524192
 - Docker version 19.03.6, build 369ce74a3c

### Structure

This project is separated in two part, frontend and backend, and develloped with the following frameworks:

#### Backend

Developped with py3.8 server running behind a uvicorn and made with:
 - fastapi to handle rest request/response
 - pydantic for model validation
 - sqlalchemy (orm) for db query/insert/update
 - alembic for db migrations
 
#### Frontend

Developped with react 17.0.0 and tested locally on a node server 15.6.0, it has been compiled (minified) and made static to be run by an dockerized nginx instance. 
