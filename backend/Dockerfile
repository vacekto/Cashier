# Build Stage
FROM eclipse-temurin:24-jdk AS build
RUN apt-get update && apt-get install -y maven
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
COPY menu.json menu.json
RUN mvn clean package -DskipTests

FROM eclipse-temurin:24-jdk AS runtime
WORKDIR /app
COPY --from=build /app/target/spark-server-1.0-SNAPSHOT.jar app.jar
COPY menu.json menu.json


ENTRYPOINT ["java", "-jar", "app.jar"]
