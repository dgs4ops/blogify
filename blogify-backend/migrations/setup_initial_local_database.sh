docker run -d --name postgresql -p 5432:5432 \
  -e POSTGRESQL_USERNAME=dev \
  -e POSTGRESQL_DATABASE=dev \
  -e ALLOW_EMPTY_PASSWORD=yes \
  bitnami/postgresql:latest

sleep 2
docker exec -i postgresql psql -U dev -d dev -W < 1712310784264_initial_schema_up.sql
