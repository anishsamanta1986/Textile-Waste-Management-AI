package com.insiderthreat.backend.service;

import com.insiderthreat.backend.entity.Textile;
import com.insiderthreat.backend.repository.TextileRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TextileService {

    @Autowired
    private TextileRepository textileRepository;

    // Add Textile
    public Textile addTextile(Textile textile) {
        return textileRepository.save(textile);
    }

    // Get All Textiles
    public List<Textile> getAllTextiles() {
        return textileRepository.findAll();
    }

    // Get Textile by ID
    public Optional<Textile> getTextileById(Long id) {
        return textileRepository.findById(id);
    }

    // Update Textile
    public Textile updateTextile(Long id, Textile updatedTextile) {

        Textile textile = textileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Textile not found"));

        textile.setTextileName(updatedTextile.getTextileName());
        textile.setMaterialType(updatedTextile.getMaterialType());
        textile.setColor(updatedTextile.getColor());
        textile.setWeight(updatedTextile.getWeight());
        textile.setSupplier(updatedTextile.getSupplier());
        textile.setQuantity(updatedTextile.getQuantity());
        textile.setRecyclable(updatedTextile.getRecyclable());

        return textileRepository.save(textile);
    }

    // Delete Textile
    public void deleteTextile(Long id) {
        textileRepository.deleteById(id);
    }
}