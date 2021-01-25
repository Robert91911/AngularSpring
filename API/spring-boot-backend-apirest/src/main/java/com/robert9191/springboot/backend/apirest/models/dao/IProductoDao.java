package com.robert9191.springboot.backend.apirest.models.dao;

import java.util.List;

import com.robert9191.springboot.backend.apirest.models.entity.Producto;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface IProductoDao extends CrudRepository<Producto, Long> {

    //Es el mismo de abajo pero este utiliza palabras clave de JPA
    public List<Producto> findByNombreContainingIgnoreCase(String term);

    public List<Producto> findByNombreStartingWithIgnoreCase(String term);

    @Query("select p from Producto p where p.nombre like %?1%")
    public List<Producto> findByNombre(String term);
    
}
