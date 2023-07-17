package com.killbug.ws.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/4/21 22:20
 */

@Component
@ServerEndpoint("/chat/{userId}")
@Slf4j
public class ChatHandler {

    private static Map<String, Session> sessions = new ConcurrentHashMap<>();

    @OnOpen
    public void onOpen(Session session, @PathParam("userId") String userId) {
        sessions.put(userId, session);
        //broadcastMessage(userId + " joined the chat");
        log.info("{} joined the chat", userId);
    }

    @OnMessage
    public void onMessage(String message, Session session, @PathParam("userId") String userId) {
        String[] parts = message.split(":", 2);
        String recipient = parts[0];
        String content = parts[1];
        sendMessage(userId, recipient, content);
    }

    @OnClose
    public void onClose(Session session, @PathParam("userId") String userId) {
        sessions.remove(userId);
        log.info("{} left the chat", userId);
    }

    private void sendMessage(String sender, String recipient, String message) {
        Session session = sessions.get(recipient);
        if (session != null) {
            try {
                session.getBasicRemote().sendText(sender + ": " + message);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}

