FROM tiangolo/uvicorn-gunicorn:python3.8

COPY ./ /app

RUN pip install -r /app/requirements.txt
RUN alembic upgrade a97171600bb8

ENV MODULE_NAME=src.app