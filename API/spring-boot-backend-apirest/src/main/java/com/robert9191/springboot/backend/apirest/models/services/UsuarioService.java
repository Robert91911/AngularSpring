package com.robert9191.springboot.backend.apirest.models.services;

import java.util.List;
import java.util.stream.Collectors;

import com.robert9191.springboot.backend.apirest.models.dao.IUsuarioDAO;
import com.robert9191.springboot.backend.apirest.models.entity.Usuario;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UsuarioService implements UserDetailsService, IUsuarioService {

    private Logger logger = LoggerFactory.getLogger(UsuarioService.class);

    @Autowired
    private IUsuarioDAO usuarioDAO;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        
        Usuario usuario = usuarioDAO.findByUsername(username);
        
        if(usuario == null) {
            logger.error("Error. No existe el usuario: " + username + " en el sistema");
            throw new UsernameNotFoundException(username);
        }

        //Aqui convertimos una lista de roles en otra lista de GrantedAuthority
        List<GrantedAuthority> authorities = usuario.getRoles()
        .stream()
        .map(role -> new SimpleGrantedAuthority(role.getNombre()))
        .peek(authority -> logger.info("Role: " + authority.getAuthority()))
        .collect(Collectors.toList());

        return new User(usuario.getUsername(), usuario.getPassword(), usuario.getEnabled(), true, true, true, authorities);
    }

    @Override
    @Transactional(readOnly = true) //Si se omite esto, no pasa nada ya que el transactional lo maneja CrudRepository
    public Usuario findByUsername(String username) {
        return usuarioDAO.findByUsername(username);
    }
    
}
