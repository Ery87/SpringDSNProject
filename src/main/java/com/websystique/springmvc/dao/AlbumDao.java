package com.websystique.springmvc.dao;

import java.math.BigInteger;
import java.util.List;

import com.websystique.springmvc.model.Album;

public interface AlbumDao {

	List<Album> findByMetaTag(String meta);
	
	Album findById(BigInteger id);
	
	void save(Album album);
	
	List<Album> findAllByUserId(BigInteger userId);
	
	void deleteById(BigInteger id);
	
}
