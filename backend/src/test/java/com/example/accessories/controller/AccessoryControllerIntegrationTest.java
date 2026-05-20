package com.example.accessories.controller;

import com.example.accessories.entity.Accessory;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AccessoryControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void createAndReadAccessory_shouldReturnCreatedAccessory() throws Exception {
        Accessory accessory = new Accessory();
        accessory.setName("Coque Silicone");
        accessory.setPrice(14.99);
        accessory.setStock(25);
        accessory.setType("Protection");

        String payload = objectMapper.writeValueAsString(accessory);

        mockMvc.perform(post("/api/accessories")
                .contentType(MediaType.APPLICATION_JSON)
                .content(payload))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Coque Silicone"));

        mockMvc.perform(get("/api/accessories"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Coque Silicone"));
    }
}
