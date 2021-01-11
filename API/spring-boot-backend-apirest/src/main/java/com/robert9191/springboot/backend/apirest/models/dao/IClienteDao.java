package com.robert9191.springboot.backend.apirest.models.dao;


import com.robert9191.springboot.backend.apirest.models.entity.Cliente;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IClienteDao extends JpaRepository<Cliente, Long> {
    
}
