package com.robert9191.springboot.backend.apirest.models.services;

import java.util.List;

import com.robert9191.springboot.backend.apirest.models.dao.IClienteDao;
import com.robert9191.springboot.backend.apirest.models.dao.IFacturaDao;
import com.robert9191.springboot.backend.apirest.models.dao.IProductoDao;
import com.robert9191.springboot.backend.apirest.models.entity.Cliente;
import com.robert9191.springboot.backend.apirest.models.entity.Factura;
import com.robert9191.springboot.backend.apirest.models.entity.Producto;
import com.robert9191.springboot.backend.apirest.models.entity.Region;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ClienteServiceImpl implements IClienteService {

    @Autowired
    private IClienteDao clienteDao;

    @Autowired
    private IFacturaDao facturaDao;
    
    @Autowired
    private IProductoDao productoDao;

    @Override
    @Transactional(readOnly = true) // Anotación opcional
    public List<Cliente> findAll() {
        return (List<Cliente>) clienteDao.findAll();
    }

    @Override
    @Transactional(readOnly = true) // Anotación opcional
    public Page<Cliente> findAll(Pageable pageable) {
        return clienteDao.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true) // Anotación opcional
    public Cliente findById(Long id) {
        return clienteDao.findById(id).orElse(null);
    }

    @Override
    public Cliente save(Cliente cliente) {
        return clienteDao.save(cliente);
    }

    @Override
    public void delete(Long id) {
        clienteDao.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true) // Anotación opcional
    public List<Region> findAllRegiones() {
        return clienteDao.findAllRegiones();
    }

    @Transactional(readOnly = true)
    @Override
    public Factura findFacturaById(Long id) {
        return facturaDao.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public Factura saveFactura(Factura factura) {
        return facturaDao.save(factura);
    }

    @Override
    @Transactional
    public void deleteFacturaById(Long id) {
        facturaDao.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true) // Anotación opcional
    public List<Producto> findProductoByNombre(String term) {
        return productoDao.findByNombre(term);
    }

    
}
