package com.co.veterinaria;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class VeterinariaApplication {

    public static void main(String[] args) {
        SpringApplication.run(VeterinariaApplication.class, args);
    }

}
