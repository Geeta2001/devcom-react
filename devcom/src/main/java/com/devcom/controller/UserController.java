package com.devcom.controller;


import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devcom.dto.UserDTO;
import com.devcom.entity.User;
import com.devcom.exception.InvalidCredentialsException;
import com.devcom.exception.UserExistsException;
import com.devcom.service.UserService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@Validated
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@RequestBody @Valid UserDTO userdto) throws UserExistsException {
			userService.registerUser(userdto);
			return new ResponseEntity<>("Success", HttpStatus.OK);
	}
	
	@PostMapping("/login")
	public ResponseEntity<Integer> loginUser(@RequestBody UserDTO userdto) throws InvalidCredentialsException {
			User user = userService.loginUser(userdto);
			return new ResponseEntity<>(user.getUserId(), HttpStatus.OK);
			
	}
	

}