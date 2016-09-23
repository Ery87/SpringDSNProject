package com.websystique.springmvc.service;

import java.math.BigInteger;
import java.util.List;

import com.websystique.springmvc.model.User;


public interface UserService {
	
	
User findById(Integer id);
	
	User findByEmail(String email);
	
	String getPublicKey(Integer id);
	
	
	void deleteByEmail(String email);
	
	List<User> findAllUsers();
	
	List<User> findByLastname(String lastname);
	
	
	void saveUser(User user);
	
	public void updateUser(Integer id,byte[] photo);
	
	public void updateUserKey(Integer id,String m,String e,String pk, String iv, String salt);
	
	boolean isUserSSOUnique(String email);

}