package com.example.accessories.selenium;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class FrontEndSeleniumTest {

    private WebDriver driver;

    @BeforeEach
    public void setup() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless=new", "--disable-gpu", "--window-size=1920,1080");
        driver = new ChromeDriver(options);
    }

    @AfterEach
    public void cleanup() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    public void shouldLoadFrontEndHomePage() {
        driver.get("http://localhost:4200");
        String bodyText = driver.findElement(By.tagName("body")).getText();
        assertTrue(bodyText.contains("Accessoires") || bodyText.contains("accessoires"),
                "La page frontend doit contenir le mot 'Accessoires'");
    }
}
