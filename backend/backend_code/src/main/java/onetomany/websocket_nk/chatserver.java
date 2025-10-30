package onetomany.websocket_nk;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnError;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Hashtable;
import java.util.Map;
public class chatserver {
    private static Map<Session, String> sessionUsernameMap = new Hashtable<>();
    private static Map<String, Session> usernameSessionMap = new Hashtable<>();
    private final Logger logger = LoggerFactory.getLogger(chatserver.class);

    @OnOpen
    public void onOpen(Session session, @PathParam("username") String username) throws IOException {
        // Simulated Authentication
        if(username == null || username.trim().isEmpty() || "admin".equalsIgnoreCase(username)) {
            session.getBasicRemote().sendText("Error: Invalid username");
            session.close();
            return;
        }

        logger.info("[onOpen] " + username);
        if (usernameSessionMap.containsKey(username)) {
            session.getBasicRemote().sendText("Error: Username already exists");
            session.close();
        } else {
            sessionUsernameMap.put(session, username);
            usernameSessionMap.put(username, session);
            broadcast("User: " + username + " has joined the chat");
            broadcastActiveUsers();
        }
    }

    @OnMessage
    public void onMessage(Session session, String message) throws IOException {
        String username = sessionUsernameMap.get(session);
        logger.info("[onMessage] " + username + ": " + message);

        if (message.equalsIgnoreCase("/typing")) {
            broadcast(username + " is typing...");
            return;
        }

        if (message.startsWith("@")) {
            String destUsername = message.split("\\s")[0].substring(1);
            String actualMessage = message.substring(destUsername.length() + 2);
            sendMessageToParticularUser(destUsername, "[DM from " + username + "]: " + actualMessage);
        } else {
            broadcast(username + ": " + message);
        }
    }

    @OnClose
    public void onClose(Session session) throws IOException {
        String username = sessionUsernameMap.get(session);
        logger.info("[onClose] " + username);
        sessionUsernameMap.remove(session);
        usernameSessionMap.remove(username);
        broadcast("User " + username + " has disconnected");
        broadcastActiveUsers();
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        logger.error("[onError] ", throwable);
    }

    private void sendMessageToParticularUser(String username, String message) {
        try {
            Session session = usernameSessionMap.get(username);
            if (session != null) {
                session.getBasicRemote().sendText(message);
            }
        } catch (IOException e) {
            logger.error("Failed to send message to user " + username, e);
        }
    }

    private void broadcast(String message) {
        sessionUsernameMap.keySet().forEach(session -> {
            try {
                session.getBasicRemote().sendText(message);
            } catch (IOException e) {
                logger.error("Failed to broadcast message", e);
            }
        });
    }

    private void broadcastActiveUsers() {
        String users = String.join(", ", usernameSessionMap.keySet());
        broadcast("Active users: " + users);
    }
}
