package com.insiderthreat.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "textiles")
public class Textile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String textileName;

    @Column(nullable = false)
    private String materialType;

    private String color;

    private double weight;

    private String supplier;

    private int quantity;

    private String recyclable;

    public Textile() {
    }

    public Textile(Long id, String textileName, String materialType,
                   String color, double weight,
                   String supplier, int quantity,
                   String recyclable) {
        this.id = id;
        this.textileName = textileName;
        this.materialType = materialType;
        this.color = color;
        this.weight = weight;
        this.supplier = supplier;
        this.quantity = quantity;
        this.recyclable = recyclable;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTextileName() {
        return textileName;
    }

    public void setTextileName(String textileName) {
        this.textileName = textileName;
    }

    public String getMaterialType() {
        return materialType;
    }

    public void setMaterialType(String materialType) {
        this.materialType = materialType;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public String getSupplier() {
        return supplier;
    }

    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getRecyclable() {
        return recyclable;
    }

    public void setRecyclable(String recyclable) {
        this.recyclable = recyclable;
    }
}