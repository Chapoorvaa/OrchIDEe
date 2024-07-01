#!/bin/bash

cd ping
mvn clean package
java -jar target/quarkus-app/quarkus-run.jar &
QUARKUS_PID=$!

cd ../frontend
npm run dev &
NPM_PID=$!

wait -n $QUARKUS_PID $NPM_PID

kill $QUARKUS_PID
kill $NPM_PID
