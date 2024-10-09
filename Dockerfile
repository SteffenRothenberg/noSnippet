FROM openjdk:19
ENV ENVIRONMENT=prod
LABEL maintainer="nosnippet"
# /app entspricht pom.xml Tag <finalName> und jar <packaging>
ADD backend/target/app2.jar app2.jar
CMD [ "sh", "-c", "java -jar /app2.jar" ]