package com.websystique.springmvc.dao;

import java.math.BigInteger;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.websystique.springmvc.model.Album;
import com.websystique.springmvc.model.User;

@Repository("AlbumDao")
public class AlbumDaoImpl extends AbstractDao<Integer, Album> implements AlbumDao{

	@SuppressWarnings("unchecked")
	public List<Album> findByMetaTag(String meta) {
		Criteria crit = createEntityCriteria();
		crit.add(Restrictions.eq("metaTag",meta));
		return (List<Album>)crit.list();
	}

	public void save(Album document) {
		persist(document);
	}

	
	public Album findById(User user,String fileName) {
		Criteria crit = createEntityCriteria();
		crit.add(Restrictions.eq("user",user));
		crit.add(Restrictions.eq("fileName",fileName));
		return (Album)crit.uniqueResult();
	
	}

	@SuppressWarnings("unchecked")
	public List<Album> findAllByUserId(User userId){
		Criteria crit = createEntityCriteria();
		crit.add(Restrictions.eq("user", userId));
		return (List<Album>)crit.list();
	}

	
	

	
}
