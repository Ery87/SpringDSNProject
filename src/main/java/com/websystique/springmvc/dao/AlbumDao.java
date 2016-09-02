package com.websystique.springmvc.dao;

import java.math.BigInteger;
import java.util.List;

import com.websystique.springmvc.model.Album;

public interface AlbumDao {

	List<Album> findByMetaTag(String meta);
	
	Album findById(Integer id);
	
	void save(Album album);
	
	List<Album> findAllByUserId(Integer userId);
	
	void deleteById(Integer id);
	
}
