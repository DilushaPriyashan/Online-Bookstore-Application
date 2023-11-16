package com.ijse.pr.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ijse.pr.payloads.responses.MessageResoponse;

@RestController
public class TestController {
    
    @GetMapping("/test")
    public ResponseEntity<MessageResoponse> test(){
        return ResponseEntity.ok(new MessageResoponse("This is a controller testing"));
    }
}
