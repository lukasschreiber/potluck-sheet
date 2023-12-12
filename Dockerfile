LABEL authors="lukasschreiber"

# Use a base image with Java and Gradle installed
FROM gradle:jdk17 AS builder

# Copy only the Gradle files to leverage Docker layer caching
COPY build.gradle settings.gradle /home/gradle/project/

# Copy the entire source code
COPY src /home/gradle/project/src

# Set the working directory
WORKDIR /home/gradle/project

# Build the application
RUN gradle build --no-daemon

# Use a smaller base image for the application runtime
FROM adoptopenjdk/openjdk17:alpine-slim

# Set the working directory
WORKDIR /app

# Copy the JAR file from the builder stage to the runtime image
COPY --from=builder /home/gradle/project/build/libs/*.jar app.jar

# Expose the port your app runs on
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "app.jar"]