FROM openjdk:8
VOLUME /tmp
COPY target/*.jar killbug-gateway.jar
ENV PORT=8888
EXPOSE $PORT
ENTRYPOINT ["java", \
            "-Dserver.port=${PORT}", \
            "-Djava.security.egd=file:/dev/./urandom", \
            "-jar", "/killbug-gateway.jar"]