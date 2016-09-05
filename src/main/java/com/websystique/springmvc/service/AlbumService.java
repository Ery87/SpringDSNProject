package com.websystique.springmvc.service;

import java.math.BigInteger;
import java.util.List;

import com.websystique.springmvc.model.Album;

public interface AlbumService {
	

	List<Album> findByMetaTag(String meta);
	
	Album findById(Integer id);
	
	List<Album> findAllByUserId(Integer id);
	
	void deleteById(Integer id);
	
	void saveAlbum(Album document);
	
	
}
