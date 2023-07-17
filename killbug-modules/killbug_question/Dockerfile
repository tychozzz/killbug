FROM openjdk:8
VOLUME /tmp
COPY target/*.jar killbug-question.jar
ENV PORT=1301
EXPOSE $PORT
ENTRYPOINT ["java", \
            "-Dserver.port=${PORT}", \
            "-Djava.security.egd=file:/dev/./urandom", \
            "-jar", "/killbug-question.jar"]