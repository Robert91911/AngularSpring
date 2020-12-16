package com.robert9191.springboot.backend.apirest.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.robert9191.springboot.backend.apirest.models.entity.Cliente;
import com.robert9191.springboot.backend.apirest.models.services.IClienteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> show(@PathVariable Long id) {
        
        Cliente cliente = null;
        Map<String, Object> response = new HashMap<>();

        try {
            cliente = clienteService.findById(id);
        } catch (DataAccessException e) {
            response.put("Mensaje", "Error  al realizar la consulta a la base de datos");
            response.put("error", e.getMessage().concat(": " ).concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if(cliente == null) {
            response.put("Mensaje", "El cliente ID: ".concat(id.toString().concat(" no existe en la base de datos")));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Cliente>(cliente, HttpStatus.OK);
        
    }

    @PostMapping("/clientes")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> create(@RequestBody Cliente cliente) {
        //cliente.setCreatedAt(new Date()); Esto se puede hacer así o dentro de la entidad Cliente con el prePersist

        Cliente clienteNew = null;
        Map<String, Object> response = new HashMap<>();

        try {
            clienteNew = clienteService.save(cliente);
        } catch (DataAccessException e) {
            response.put("Mensaje", "Error  al realizar la inserción en la base de datos");
            response.put("error", e.getMessage().concat(": " ).concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("mensaje", "El cliente ha sido creado con éxito!"); 
        response.put("cliente", clienteNew);
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }

    @PutMapping("clientes/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Cliente cliente) {
        
        Cliente clienteAtual = clienteService.findById(id);
        Cliente clienteUpdated = null;
        
        Map<String, Object> response = new HashMap<>();

        if(cliente == null) {
            response.put("mensaje", "El cliente no se ha podido editar");
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }

        try {

            clienteAtual.setApellido(cliente.getApellido());
            clienteAtual.setNombre(cliente.getNombre());
            clienteAtual.setEmail(cliente.getEmail());
            clienteAtual.setCreatedAt(cliente.getCreatedAt());

            clienteUpdated = clienteService.save(clienteAtual);

        } catch (DataAccessException e) {
            response.put("Mensaje", "Error  al realizar la actualizaciónm en la base de datos");
            response.put("error", e.getMessage().concat(": " ).concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("mensaje", "El cliente ha sido creado con éxito!"); 
        response.put("cliente", clienteUpdated);
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);

    }

    @DeleteMapping("/clientes/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();

        try {

            clienteService.delete(id);

        } catch (DataAccessException e) {
            response.put("Mensaje", "Error  al eliminar el clinete en la base de datos");
            response.put("error", e.getMessage().concat(": " ).concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
        response.put("mensaje", "El cliente ha sido eliminado con éxito!"); 
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);

    }


    

}
