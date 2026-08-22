package com.portfolio.controller;

import com.portfolio.model.ContactMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    @Value("${brevo.api.key:}")
    private String brevoApiKey;

    @Value("${brevo.sender.email:abimanim311@gmail.com}")
    private String senderEmail;

    private static final String BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
    private static final String RECEIVER_EMAIL = "abimanim311@gmail.com";

    @PostMapping("/send")
    public String sendMessage(@RequestBody ContactMessage message) {
        try {
            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("api-key", brevoApiKey);
            headers.set("accept", "application/json");

            Map<String, Object> sender = new HashMap<>();
            sender.put("name", "Portfolio Contact Form");
            sender.put("email", senderEmail);

            Map<String, Object> receiver = new HashMap<>();
            receiver.put("email", RECEIVER_EMAIL);
            receiver.put("name", "Abimani");

            Map<String, Object> body = new HashMap<>();
            body.put("sender", sender);
            body.put("to", List.of(receiver));
            body.put("subject", "New Portfolio Message from " + message.getName());
            body.put("textContent",
                    "Hello Abimani,\n\nYou received a new contact message on your portfolio:\n\n" +
                    "Sender Name: " + message.getName() + "\n" +
                    "Sender Email: " + message.getEmail() + "\n\n" +
                    "Message Content:\n" + message.getMessage() + "\n\n" +
                    "Best regards,\nPortfolio Backend");

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
            restTemplate.postForEntity(BREVO_API_URL, request, String.class);
        } catch (Exception e) {
            System.err.println("Email notification failed: " + e.getMessage());
        }

        return "Message received successfully!";
    }
}
