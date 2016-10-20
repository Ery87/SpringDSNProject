package com.websystique.springmvc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.websystique.springmvc.dao.Public_KeyDao;
import com.websystique.springmvc.model.Public_Key;


@Service("Public_KeyService")
@Transactional
public class Public_keyServiceImpl implements Public_KeyService{

	@Autowired
	private Public_KeyDao dao;


	public Public_Key getKey(String service) {
		return dao.getKey(service);
	}



}
