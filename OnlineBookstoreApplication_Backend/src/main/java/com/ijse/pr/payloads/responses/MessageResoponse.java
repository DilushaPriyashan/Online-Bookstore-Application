package com.ijse.pr.payloads.responses;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageResoponse {      //create to get responses from Json format instead of text
    private String message;

    public MessageResoponse(String message){
        this.message=message;
    }
    
}
