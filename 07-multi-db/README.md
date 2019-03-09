docker run \
    --name some-postgres \
    -e POSTGRES_USER=lucas \
    -e POSTGRES_PASSWORD=banco123 \
    -e POSTEGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

docker ps
docker exec -it some-postgres /bin/bash

docker run --name adminer -p 8080:8080 --link some-postgres:some-postgres -d adminer

## ---- MONGODB
docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin -d mongo:4

docker run --name mongoclient -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient

docker exec -it mongodb mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin --eval "db.getSiblingDB('herois').createUser({user: 'lucas', pwd: 'senha', roles: [{role: 'readWrite', db: 'herois'}]})"
