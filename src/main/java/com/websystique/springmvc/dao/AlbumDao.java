package com.websystique.springmvc.dao;

import java.util.List;

import com.websystique.springmvc.model.Album;

public interface AlbumDao {

	List<Album> findByMetaTag(String meta);
	
	Album findById(int id);
	
	void save(Album album);
	
	List<Album> findAllByUserId(int userId);
	
	void deleteById(int id);
	
}
