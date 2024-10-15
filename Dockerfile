# Verwende ein leichtes Alpine-basiertes Image mit JDK 19
FROM openjdk:19-jdk-alpine

# Setze die Umgebungsvariable auf 'prod'
ENV ENVIRONMENT=prod

# Füge ein Label für den Maintainer hinzu
LABEL maintainer="nosnippet"

# Erstelle ein Verzeichnis für die App
WORKDIR /app

# Kopiere die fertige JAR-Datei aus dem target-Ordner ins Container-Verzeichnis
COPY target/app2.jar /app/app2.jar

# Exponiere den Port, den die App verwenden wird (z. B. 8080)
EXPOSE 8080

# Starte die Java-Anwendung
CMD ["java", "-jar", "/app/app2.jar"]
