package com.devcom.service;

import java.util.List;

import com.devcom.dto.UserDTO;
import com.devcom.entity.User;

public interface UserService {
	public User registerUser(UserDTO userdto);
	
	public User loginUser(UserDTO userdto);
	
	public User blockingUser(int userId);
	
	public User unblockingUser(int userId);
	
	public List<User> getAllUsers();
	
}
