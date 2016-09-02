package com.websystique.springmvc.dao;

import java.math.BigInteger;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.websystique.springmvc.model.Album;

@Repository("AlbumDao")
public class AlbumDaoImpl extends AbstractDao<Integer, Album> implements AlbumDao{

	@SuppressWarnings("unchecked")
	public List<Album> findByMetaTag() {
		Criteria crit = createEntityCriteria();
		return (List<Album>)crit.list();
	}

	public void save(Album document) {
		persist(document);
	}

	
	public Album findById(Integer id) {
		return getByKey(id);
	}

	@SuppressWarnings("unchecked")
	public List<Album> findAllByUserId(Integer userId){
		Criteria crit = createEntityCriteria();
		Criteria userCriteria = crit.createCriteria("user");
		userCriteria.add(Restrictions.eq("id", userId));
		return (List<Album>)crit.list();
	}

	
	public void deleteById(Integer id) {
		Album document =  getByKey(id);
		delete(document);
	}

	public List<Album> findByMetaTag(String meta) {
		Criteria crit=createEntityCriteria();
		crit.add(Restrictions.eq("metaTag", meta));
		List<Album> albums=(List<Album>) crit.list();
		return albums;
	}

	
}
