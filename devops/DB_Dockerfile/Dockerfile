FROM mysql:8

ENV MYSQL_ROOT_PASSWORD="Letmein1!"
ENV MYSQL_DATABASE="ca"

COPY ca_adpq_schema.sql /docker-entrypoint-initdb.d/ca_adpq_schema.sql