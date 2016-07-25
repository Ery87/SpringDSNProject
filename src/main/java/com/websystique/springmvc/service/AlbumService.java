package com.websystique.springmvc.service;

import java.math.BigInteger;
import java.util.List;

import com.websystique.springmvc.model.Album;

public interface AlbumService {
	

	List<Album> findByMetaTag(String meta);
	
	Album findById(BigInteger id);
	
	List<Album> findAllByUserId(BigInteger userId);
	
	void deleteById(BigInteger id);
	
	void saveAlbum(Album document);
	
	
}
