package com.websystique.springmvc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.websystique.springmvc.dao.AlbumDao;
import com.websystique.springmvc.model.Album;

@Service("userDocumentService")
@Transactional
public class AlbumServiceImpl implements AlbumService{

	@Autowired
	AlbumDao dao;

	public Album findById(int id) {
		return dao.findById(id);
	}

	
	public List<Album> findAllByUserId(int userId) {
		return dao.findAllByUserId(userId);
	}
	
	public void saveAlbum(Album document){
		dao.save(document);
	}

	public void deleteById(int id){
		dao.deleteById(id);
	}

	public List<Album> findByMetaTag(String meta) {
		return dao.findByMetaTag(meta);
	}

	
	
}
