package com.portfolio.controller;

import com.portfolio.model.ContactMessage;
import com.portfolio.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/send")
    public String sendMessage(@RequestBody ContactMessage message) {
        // 1. Save to Database
        contactRepository.save(message);

        // 2. Dispatch Email (catch exception so that email configuration failures don't crash form processing)
        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setTo("abimanim311@gmail.com");
            mail.setSubject("New Portfolio Message from " + message.getName());
            mail.setText("Hello Abimani,\n\nYou received a new contact message on your portfolio:\n\n" +
                         "Sender Name: " + message.getName() + "\n" +
                         "Sender Email: " + message.getEmail() + "\n\n" +
                         "Message Content:\n" + message.getMessage() + "\n\n" +
                         "Best regards,\nPortfolio Backend");
            mailSender.send(mail);
        } catch (Exception e) {
            System.err.println("Email notification failed: " + e.getMessage());
        }

        return "Message received successfully!";
    }
}