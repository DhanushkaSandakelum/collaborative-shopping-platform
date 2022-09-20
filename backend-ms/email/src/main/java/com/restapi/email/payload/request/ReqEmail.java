package com.restapi.email.payload.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ReqEmail {
    private String recipient;
    private String msgBody;
    private String subject;
    private String attachment;
}
