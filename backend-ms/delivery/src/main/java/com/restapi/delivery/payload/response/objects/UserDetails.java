package com.restapi.delivery.payload.response.objects;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDetails {
    private String username;
    private String firstName;
    private String lastName;
}
