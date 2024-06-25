# Stage 1: Build the application
FROM maven:3.9.7-eclipse-temurin-17-alpine AS build
WORKDIR /build

# Copy the pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the source code and build the package
COPY src ./src
RUN mvn clean package

# Stage 2: Create the runtime image
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Copy the built application from the build stage
COPY --from=build /build/target/quarkus-app/quarkus-run.jar /app/quarkus-run.jar
COPY --from=build /build/target/quarkus-app/lib/ /app/lib/
COPY --from=build /build/target/quarkus-app/app/ /app/app/
COPY --from=build /build/target/quarkus-app/quarkus/ /app/quarkus/

# Expose the application port
EXPOSE 8080

RUN echo $HOME

# Define the entry point
ENTRYPOINT ["java", "-jar", "/app/quarkus-run.jar"]
