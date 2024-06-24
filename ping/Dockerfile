FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY target/quarkus-app/* ./

RUN ls

EXPOSE 8000

ENTRYPOINT ["java", "-jar", "quarkus-run.jar"]