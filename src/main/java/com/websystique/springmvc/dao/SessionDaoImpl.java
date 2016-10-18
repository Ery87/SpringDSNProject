package com.websystique.springmvc.dao;

import org.hibernate.Criteria;
import org.hibernate.Hibernate;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.websystique.springmvc.model.SessionUser;
import com.websystique.springmvc.model.User;

@Repository("sessionUserDao")
public class SessionDaoImpl extends AbstractDao<Integer,SessionUser> implements SessionUserDao{

	

	@Override
	public void saveSession(SessionUser u) {
		persist(u);
		
	}

	@Override
	public SessionUser getSessionUser(User u,String session) {
		Criteria crit=createEntityCriteria();
		crit.add(Restrictions.eq("user", u));
		crit.add(Restrictions.eq("sessionId", session));
		SessionUser sessUser=(SessionUser)crit.uniqueResult();
		
		return sessUser; 
	}

	@Override
	public void deleteSession(User u, String sessionId) {
		Criteria crit=createEntityCriteria();
		crit.add(Restrictions.eq("user", u));
		crit.add(Restrictions.eq("sessionId", sessionId));
		SessionUser session=(SessionUser)crit.uniqueResult();
		delete(session);		
	}


	
	
	

}
