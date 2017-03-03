# ca-adpq-prototype/devops/Docker Environment Builds.md
# author:  Ryan Chadwick
# company: FEi Systems Inc.

This document covers standing up each environment's Docker containers.

The Prototyp is split into two Docker Images feidevops/ca_adpq_proto and feidevops/ca_adpq_proto_db.

The first contains the .Net Core web application.  The second contains a MySQL based image that creates the starting database for the web application.

#DEV
Local development install.

**MySQL**

docker run --name ca-adpq-db-devlocal -d feidevops/ca_adpq_proto_db:latest

**Prototype Website**

docker run --name ca-adpq-web-devlocal --link ca-adpq-db-devlocal:mysql -p 5000:5000 -d feidevops/ca_adpq_proto:devlocal

#QC:Latest
QC servers are hosted on the internal FEi cloud and not accessible from outside of our network

**MySQL**

docker run --name ca-adpq-db-latest -p 3306:3306 -v /var/mysql-data/ca-adpq-db-latest:/var/lib/mysql -e MYSQL_ROOT_PASSWORD="XXXXXXX" -d feidevops/ca_adpq_proto_db:latest

**Prototype Website**

docker run --name ca-adpq-web-latest --link ca-adpq-db-latest:mysql -p 5000:5000 -d feidevops/ca_adpq_proto:latest

**Watchtower**

docker run --name watchtower -v /var/run/docker.sock:/var/run/docker.sock -d centurylink/watchtower

**Docker Dash**

docker run --name dockerdash -p 5050:5050 -v /var/run/docker.sock:/var/run/docker.sock -e DOCKERDASH_USER='XXXXXX' -e DOCKERDASH_PASSWORD='XXXXXXX' -d stefanprodan/dockerdash

#QC:Stable
QC servers are hosted on the internal FEi cloud and not accessible from outside of our network

**MySQL**

docker run --name ca-adpq-db-stable -p 3307:3306 -v /var/mysql-data/ca-adpq-db-stable:/var/lib/mysql -e MYSQL_ROOT_PASSWORD="XXXXXXX" -d feidevops/ca_adpq_proto_db:latest

**Prototype Website**

docker run --name ca-adpq-web-stable --link ca-adpq-db-stable:mysql -p 5001:5000 -d feidevops/ca_adpq_proto:stable

#Production
Production servers are available to the public.  Links are provided below.

**MySQL**

docker run --name ca-adpq-db-production -p 3306:3306 -v /var/mysql-data/ca-adpq-db-production:/var/lib/mysql -e MYSQL_ROOT_PASSWORD="XXXXXXX" -d feidevops/ca_adpq_proto_db:latest

**Prototype Website**

[CA ADPQ Prototype](http://ca-adpq-prototype.eastus2.cloudapp.azure.com)

docker run --name ca-adpq-web-production --link ca-adpq-db-production:mysql -p 80:5000 -d feidevops/ca_adpq_proto:production

**Docker Dash**

[DockerDash Docker Engine Dashboard](http://ca-adpq-prototype.eastus2.cloudapp.azure.com:5050)

docker run --name dockerdash -p 5050:5050 -v /var/run/docker.sock:/var/run/docker.sock -e DOCKERDASH_USER='XXXXXX' -e DOCKERDASH_PASSWORD='XXXXXXX' -d stefanprodan/dockerdash

**Watchtower**

docker run --name watchtower -v /var/run/docker.sock:/var/run/docker.sock -d centurylink/watchtower

**Prometheus Server**

[Prometheus Monitoring Server](http://ca-adpq-prototype.eastus2.cloudapp.azure.com:9090/status)

docker run --name prom-prometheus -p 9090:9090 -v /var/prometheus-data:/prometheus-data -d prom/prometheus -config.file=/prometheus-data/prometheus.yml

**Prometheus Exporters**

docker run --name prom-container-exporter -p 9102:9104 -v /sys/fs/cgroup:/cgroup -v /var/run/docker.sock:/var/run/docker.sock -d prom/container-exporter

docker run --name prom-collectd-exporter -p 9103:9103 -p 25826:25826/udp -d prom/collectd-exporter -collectd.listen-address=":25826"

docker run --name prom-mysqld-exporter -p 9104:9104 --link=ca-adpq-db-production:bdd -e DATA_SOURCE_NAME='XXXXXX:XXXXXXX@(bdd:3306)/ca' -d prom/mysqld-exporter

docker run --name prom-node-exporter -p 9100:9100 -v "/proc:/host/proc" -v "/sys:/host/sys" -v "/:/rootfs" --net="host" -d quay.io/prometheus/node-exporter -collector.procfs /host/proc -collector.sysfs /host/sys -collector.filesystem.ignored-mount-points "^/(sys|proc|dev|host|etc)($|/)"

**Grafana**

[Grafana Metric and Analytic Dashboard](http://ca-adpq-prototype.eastus2.cloudapp.azure.com:3000)

docker run --name grafana -p 3000:3000 -e 'GF_SERVER_ROOT_URL=ca-adpq-prototype.eastus2.cloudapp.azure.com:3000' -e 'GF_SECURITY_ADMIN_PASSWORD=XXXXXXXX' -v /var/grafana-data:/var/lib/grafana -d grafana/grafana


