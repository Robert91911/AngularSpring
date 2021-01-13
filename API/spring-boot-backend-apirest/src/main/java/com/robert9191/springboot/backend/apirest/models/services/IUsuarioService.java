package com.robert9191.springboot.backend.apirest.models.services;

import com.robert9191.springboot.backend.apirest.models.entity.Usuario;

public interface IUsuarioService {

    public Usuario findByUsername(String username);
    
}
