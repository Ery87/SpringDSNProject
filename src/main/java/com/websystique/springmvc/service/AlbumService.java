package com.websystique.springmvc.service;

import java.util.List;

import com.websystique.springmvc.model.Album;

public interface AlbumService {
	

	List<Album> findByMetaTag(String meta);
	
	Album findById(int id);
	
	List<Album> findAllByUserId(int userId);
	
	void deleteById(int id);
	
	void saveAlbum(Album document);
	
	
}
