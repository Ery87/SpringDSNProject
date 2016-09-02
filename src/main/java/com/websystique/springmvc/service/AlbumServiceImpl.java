package com.websystique.springmvc.service;

import java.math.BigInteger;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.websystique.springmvc.dao.AlbumDao;
import com.websystique.springmvc.model.Album;

@Service("AlbumService")
@Transactional
public class AlbumServiceImpl implements AlbumService{

	@Autowired
	AlbumDao dao;

	public Album findById(Integer id) {
		return dao.findById(id);
	}

	
	public List<Album> findAllByUserId(Integer userId) {
		return dao.findAllByUserId(userId);
	}
	
	public void saveAlbum(Album document){
		dao.save(document);
	}

	public void deleteById(Integer id){
		dao.deleteById(id);
	}

	public List<Album> findByMetaTag(String meta) {
		return dao.findByMetaTag(meta);
	}


	public Album findById(BigInteger id) {
		// TODO Auto-generated method stub
		return null;
	}


	


	

	
	
}
