# Multi-stage Docker build for Spring Boot on Render (Root context)
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Install Maven in Alpine container
RUN apk add --no-cache maven

COPY DevPortfolio-CMS ./
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/devportfolio-cms-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
