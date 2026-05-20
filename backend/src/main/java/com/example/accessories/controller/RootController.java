package com.example.accessories.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

    @GetMapping("/")
    public String root() {
        return "Backend running. Use /api/accessories, /api/brands, /api/categories.";
    }
}
