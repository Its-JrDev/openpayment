package com.granero.payments.util;

import org.springframework.core.io.ClassPathResource;
import java.io.IOException;

public class KeyTest {
    public static void main(String[] args) {
        try {
            ClassPathResource resource = new ClassPathResource("keys/private.pem");
            if (resource.exists()) {
                System.out.println("File found: " + resource.getFilename());
            } else {
                System.out.println("File NOT found: " + resource.getFilename());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }