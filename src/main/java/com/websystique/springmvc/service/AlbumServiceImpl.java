package com.websystique.springmvc.service;

import java.math.BigInteger;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.websystique.springmvc.dao.AlbumDao;
import com.websystique.springmvc.model.Album;
import com.websystique.springmvc.model.User;
import com.websystique.springmvc.service.AlbumService;

@Service("AlbumService")
@Transactional
public class AlbumServiceImpl implements AlbumService{

	@Autowired
	AlbumDao dao;

	public Album findById(User user,String fileName) {
		return dao.findById(user,fileName);
	}


	public List<Album> findAllByUserId(User userId) {
		return dao.findAllByUserId(userId);
	}




	public List<Album> findByMetaTag(String meta) {
		return dao.findByMetaTag(meta);
	}


	@Override
	public void save(Album album) {
		dao.save(album);// TODO Auto-generated method stub

	}











}
