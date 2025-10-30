package onetomany.WebSocketDirectMessage;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Hashtable;
import java.util.Map;

public class DirectMessageHandler extends TextWebSocketHandler {

    private static Map<WebSocketSession, String> sessionUsernameMap = new Hashtable<>();
    private static Map<String, WebSocketSession> usernameSessionMap = new Hashtable<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String username = (String) session.getAttributes().get("username");
        sessionUsernameMap.put(session, username);
        usernameSessionMap.put(username, session);
        sendMessageToParticularUser(username, "Welcome to the Direct Messaging service!");
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String username = sessionUsernameMap.get(session);
        String[] parts = message.getPayload().split(":", 2);
        if (parts.length == 2) {
            String recipientUsername = parts[0].substring(1);
            String messageContent = parts[1];
            sendMessageToParticularUser(recipientUsername, "[DM] " + username + ": " + messageContent);
            sendMessageToParticularUser(username, "[DM] " + username + ": " + messageContent);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String username = sessionUsernameMap.get(session);
        sessionUsernameMap.remove(session);
        usernameSessionMap.remove(username);
    }

    private void sendMessageToParticularUser(String username, String message) {
        try {
            WebSocketSession session = usernameSessionMap.get(username);
            if (session != null && session.isOpen()) {
                session.sendMessage(new TextMessage(message));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}