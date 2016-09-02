package com.websystique.springmvc.dao;

import java.math.BigInteger;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Hibernate;
import org.hibernate.Transaction;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.websystique.springmvc.model.User;



@Repository("userDao")
public  class UserDaoImpl extends AbstractDao<Integer, User> implements UserDao {

	
	public User findById(Integer id) {
		User user = getByKey(id);
		if(user!=null){
			Hibernate.initialize(user.getId());
		}
		return user;
	}

	public User findByEmail(String email) {
		Criteria crit = createEntityCriteria();
		crit.add(Restrictions.eq("email", email));
		User user = (User)crit.uniqueResult();
		return user;
	}

	@SuppressWarnings("unchecked")
	public List<User> findAllUsers() {
		Criteria criteria = createEntityCriteria().addOrder(Order.asc("firstname"));
		criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);//To avoid duplicates.
		List<User> users = (List<User>) criteria.list();
		
		return users;
	}

	public void save(User user) {
		persist(user);
	}

	public void deleteByEmail(String email) {
		Criteria crit = createEntityCriteria();
		crit.add(Restrictions.eq("email", email));
		User user = (User)crit.uniqueResult();
		delete(user);
	}

	public List<User> findByLastname(String lastname) {
		Criteria criteria=createEntityCriteria().addOrder(Order.asc("firstname"));
		criteria.add(Restrictions.eq("lastname", lastname));
		List<User> users=(List<User>) criteria.list();
		return users;
	}

	public void savePhoto(User user) {
		getSession().update(user);
		
	}

	public String getPublicKey(Integer id) {
		Criteria criteria=createEntityCriteria();
		criteria.add(Restrictions.eq("id",id));
		String pk=(String)criteria.uniqueResult();
		return pk;
	}

	public void savePK(User entity) {
		getSession().update(entity);
	}

}
