package com.websystique.springmvc.dao;

import java.math.BigInteger;
import java.util.List;

import com.websystique.springmvc.model.Album;
import com.websystique.springmvc.model.User;

public interface AlbumDao {

	List<Album> findByMetaTag(String meta);
	
	Album findById(User user,String fileName);
	
	void save(Album album);
	
	List<Album> findAllByUserId(User userId);
		
	
}
