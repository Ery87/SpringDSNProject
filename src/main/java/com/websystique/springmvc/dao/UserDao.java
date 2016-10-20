package com.websystique.springmvc.dao;

import java.math.BigInteger;
import java.util.List;

import com.websystique.springmvc.model.User;


public interface UserDao {


	User findById(Integer id);

	User findByEmail(String email);

	void save(User user);

	void savePhoto(User user);


	void deleteByEmail(String email);

	List<User> findAllUsers();

	List<User> findByLastname(String lastname);

	String getPublicKey(Integer id);

	void savePK(User entity);

}

