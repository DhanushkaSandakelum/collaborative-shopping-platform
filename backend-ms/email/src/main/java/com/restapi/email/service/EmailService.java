package com.restapi.email.service;

import com.restapi.email.payload.request.EmailRequest;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;

@Service
public class EmailService {
    private JavaMailSender javaMailSender;
    private String sender = "ucscgroupproject@gmail.com";

    public String sendSimpleMail(EmailRequest details) {
        try{
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper;

            // Setting multipart as true for sen attachments with email
            mimeMessageHelper = new MimeMessageHelper(mimeMessage);

            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(details.getRecipient());

            String mailBody = "";
            mailBody += details.getMsgBody();

            mimeMessageHelper.setText(mailBody, true);
            mimeMessageHelper.setSubject(details.getSubject());

            javaMailSender.send(mimeMessage);
            return "Mail send successfully";
        } catch (Exception e){
            return "Error while sending mail";
        }
    }

}
