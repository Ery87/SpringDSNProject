package com.websystique.springmvc.dao;



import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.websystique.springmvc.model.Album;
import com.websystique.springmvc.model.FriendshipRequest;
import com.websystique.springmvc.model.SessionUser;
import com.websystique.springmvc.model.User;

@Repository("FriendshipRequestDao")
public class FriendshipRequestDaoImpl extends AbstractDao<Integer, FriendshipRequest> implements FriendshipRequestDao{

	@Override
	public FriendshipRequest getRequest(Integer u1, Integer u2) {
		Criteria crit = createEntityCriteria();
		crit.add(Restrictions.eq("user_requestor",u1));
		crit.add(Restrictions.eq("user_acceptor",u2));
		return (FriendshipRequest)crit.uniqueResult();

	}

	@Override
	public List<FriendshipRequest> getAllRequest(Integer u) {
		Criteria crit = createEntityCriteria();
		crit.add(Restrictions.eq("user_acceptor",u));
		return (List<FriendshipRequest>)crit.list();
	}

	@Override
	public void save(FriendshipRequest friend) {
		persist(friend);

	}

	@Override
	public void delete(Integer id_requestor, Integer id_acceptor) {
		Criteria crit=createEntityCriteria();
		crit.add(Restrictions.eq("user_requestor",id_requestor));
		crit.add(Restrictions.eq("user_acceptor", id_acceptor));
		FriendshipRequest friend=(FriendshipRequest)crit.uniqueResult();
		delete(friend);

	}


}
