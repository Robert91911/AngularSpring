package com.atos.springboot.backend.apirest.models.services;

import java.util.List;

import com.atos.springboot.backend.apirest.models.entity.Cliente;

public interface IClienteService {
    
    public List<Cliente> findAll();

}
