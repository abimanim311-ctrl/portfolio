# Stage 1: Build the application using Maven
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
# Download dependencies first (cached layer)
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests -B

# Stage 2: Create the production runtime image
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Define port fallback
ENV PORT=8080
EXPOSE 8080

# Execute the application
ENTRYPOINT ["java", "-Dserver.port=${PORT}", "-jar", "app.jar"]
