FROM gradle:jdk17 AS builder
LABEL authors="lukasschreiber"

COPY build.gradle settings.gradle /home/gradle/project/
COPY src /home/gradle/project/src
COPY frontend /home/gradle/project/frontend

WORKDIR /home/gradle/project

RUN gradle build --no-daemon

FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=builder /home/gradle/project/build/libs/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]