package com.websystique.springmvc.service;

import java.math.BigInteger;
import java.util.List;

import com.websystique.springmvc.model.User;


public interface UserService {
	
	
User findById(BigInteger id);
	
	User findByEmail(String email);
	

	
	void deleteByEmail(String email);
	
	List<User> findAllUsers();
	
	List<User> findByLastname(String lastname);
	
	
	void saveUser(User user);
	
	public void updateUser(BigInteger id,byte[] photo);
	

	
	boolean isUserSSOUnique(String email);

}