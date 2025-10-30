package onetomany.WebSocketDirectMessage;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DirectMessageController {

    @GetMapping("/direct-message")
    public String getDirectMessagePage() {
        return "direct-message";
    }
}