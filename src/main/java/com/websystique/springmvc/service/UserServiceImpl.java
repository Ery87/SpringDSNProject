package com.websystique.springmvc.service;

import java.math.BigInteger;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.websystique.springmvc.dao.UserDao;
import com.websystique.springmvc.model.User;


@Service("userService")
@Transactional
public class UserServiceImpl implements UserService{

	@Autowired
	private UserDao dao;

	public User findById(Integer id) {
		return dao.findById(id);
	}

	public User findByEmail(String email) {
		User user = dao.findByEmail(email);
		return user;
	}

	public void saveUser(User user) {
		dao.save(user);
	}

	/*
	 * Since the method is running with Transaction, No need to call hibernate update explicitly.
	 * Just fetch the entity from db and update it with proper values within transaction.
	 * It will be updated in db once transaction ends. 
	 */
public void updateUser(Integer id,byte[] photo) {
		
		User entity = dao.findById(id);
		if(entity!=null){
			
			entity.setPhoto(photo);
		}
		dao.savePhoto(entity);
		
	}
	
	public void updateUserKey(Integer id, String m, String e, String pk,String iv,String salt) {
		User entity=dao.findById(id);
		if(entity!=null){
			entity.setExponent_public(e);
			entity.setModulus_public(m);
			entity.setPrivate_key(pk);
			entity.setSalt(salt);
			entity.setIv(iv);
		}
		dao.savePK(entity);
	}
	
	public void deleteByEmail(String email) {
		dao.deleteByEmail(email);
	}

	public List<User> findAllUsers() {
		return dao.findAllUsers();
	}

	public boolean isUserSSOUnique(String email) {
		User user = findByEmail(email);
		return ( user == null || ((email != null) && (user.getEmail() == email)));
		}

	

	public List<User> findByLastname(String lastname) {
		return dao.findByLastname(lastname);
	}

	public String getPublicKey(Integer id) {
		return dao.getPublicKey(id);
	}

	

	
	

	
	
}
