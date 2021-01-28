package com.robert9191.springboot.backend.chat.models.dao;

import java.util.List;

import com.robert9191.springboot.backend.chat.models.documents.Mensaje;

import org.springframework.data.mongodb.repository.MongoRepository;


public interface ChatRepository extends MongoRepository<Mensaje, String>{
	
    public List<Mensaje> findFirst10ByOrderByFechaDesc();
}