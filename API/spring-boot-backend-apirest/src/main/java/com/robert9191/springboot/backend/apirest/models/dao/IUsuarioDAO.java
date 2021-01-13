package com.robert9191.springboot.backend.apirest.models.dao;

import com.robert9191.springboot.backend.apirest.models.entity.Usuario;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface IUsuarioDAO extends CrudRepository<Usuario, Long> {

    public Usuario findByUsername(String username);

    //Es lo mismo de arriba pero de otra forma
    @Query("select u from Usuario u where u.username=?1")
    public Usuario findByUsername2(String username);

}
