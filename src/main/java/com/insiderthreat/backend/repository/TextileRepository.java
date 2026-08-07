package com.insiderthreat.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.insiderthreat.backend.entity.Textile;

@Repository
public interface TextileRepository extends JpaRepository<Textile, Long> {

}