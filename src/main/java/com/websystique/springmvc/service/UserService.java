package com.websystique.springmvc.service;

import java.util.List;

import com.websystique.springmvc.model.User;


public interface UserService {
	
	
User findById(int id);
	
	User findByEmail(String email);
	

	
	void deleteByEmail(String email);
	
	List<User> findAllUsers();
	
	List<User> findByLastname(String lastname);
	
	
	void saveUser(User user);
	
	public void updateUser(int id,byte[] photo);
	

	
	boolean isUserSSOUnique(String email);

}