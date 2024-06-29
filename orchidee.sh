#!/bin/bash

cd ping
mvn quarkus:dev &
MAVEN_PID=$!

cd ../frontend
npm run dev &
NPM_PID=$!

wait -n $MAVEN_PID $NPM_PID

kill $MAVEN_PID
kill $NPM_PID
