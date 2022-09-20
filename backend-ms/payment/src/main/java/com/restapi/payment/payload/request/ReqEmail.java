package com.restapi.payment.payload.request;

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
