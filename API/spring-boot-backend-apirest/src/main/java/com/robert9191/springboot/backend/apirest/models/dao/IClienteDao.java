package com.robert9191.springboot.backend.apirest.models.dao;


import java.util.List;

import com.robert9191.springboot.backend.apirest.models.entity.Cliente;
import com.robert9191.springboot.backend.apirest.models.entity.Region;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface IClienteDao extends JpaRepository<Cliente, Long> {
    
    @Query("from Region")
    public List<Region> findAllRegiones();
}
