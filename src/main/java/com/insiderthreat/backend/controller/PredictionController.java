package com.insiderthreat.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/predict")
public class PredictionController {

    @PostMapping("/fabric")
    public ResponseEntity<?> predictFabric(
            @RequestParam("file") MultipartFile file) {

        // Temporary response
        return ResponseEntity.ok(
                Map.of(
                        "prediction", "Cotton",
                        "confidence", "97%"
                )
        );
    }
}