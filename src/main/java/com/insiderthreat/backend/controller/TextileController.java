package com.insiderthreat.backend.controller;

import com.insiderthreat.backend.entity.Textile;
import com.insiderthreat.backend.service.TextileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/textiles")
public class TextileController {

    @Autowired
    private TextileService textileService;

    // Add Textile
    @PostMapping
    public Textile addTextile(@RequestBody Textile textile) {
        return textileService.addTextile(textile);
    }

    // Get All Textiles
    @GetMapping
    public List<Textile> getAllTextiles() {
        return textileService.getAllTextiles();
    }

    // Get Textile by ID
    @GetMapping("/{id}")
    public Optional<Textile> getTextileById(@PathVariable Long id) {
        return textileService.getTextileById(id);
    }

    // Update Textile
    @PutMapping("/{id}")
    public Textile updateTextile(@PathVariable Long id,
                                 @RequestBody Textile textile) {
        return textileService.updateTextile(id, textile);
    }

    // Delete Textile
    @DeleteMapping("/{id}")
    public String deleteTextile(@PathVariable Long id) {
        textileService.deleteTextile(id);
        return "Textile deleted successfully.";
    }
}