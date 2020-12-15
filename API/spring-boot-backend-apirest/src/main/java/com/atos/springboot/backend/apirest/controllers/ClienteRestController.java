package com.atos.springboot.backend.apirest.controllers;

import java.util.List;

import com.atos.springboot.backend.apirest.models.entity.Cliente;
import com.atos.springboot.backend.apirest.models.services.IClienteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class ClienteRestController {
    
    @Autowired
    private IClienteService clienteService;

    @GetMapping("/clientes")
    public List<Cliente> index() {
        return clienteService.findAll();
    }

    @GetMapping("/clientes/{id}")
    @ResponseStatus(HttpStatus.OK) //No hace falta ya que por defecto ya es un Ok
    public Cliente show(@PathVariable Long id) {
        return clienteService.findById(id);
    }

    @PostMapping(value="/clientes")
    @ResponseStatus(HttpStatus.CREATED)
    public Cliente create(@RequestBody Cliente cliente) {
        //cliente.setCreatedAt(new Date()); Esto se puede hacer así o dentro de la entidad Cliente con el prePersist
        return clienteService.save(cliente);
    }

    @PutMapping(value="clientes/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public Cliente update(@PathVariable Long id, @RequestBody Cliente cliente) {
        Cliente clienteAtual = clienteService.findById(id);

        clienteAtual.setApellido(cliente.getApellido());
        clienteAtual.setNombre(cliente.getNombre());
        clienteAtual.setEmail(cliente.getEmail());

        return clienteService.save(clienteAtual);

    }

    @DeleteMapping("/clientes/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        clienteService.delete(id);
    }


    

}
