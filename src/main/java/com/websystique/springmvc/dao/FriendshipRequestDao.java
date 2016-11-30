package com.websystique.springmvc.dao;

import java.util.List;

import com.websystique.springmvc.model.FriendshipRequest;
import com.websystique.springmvc.model.User;

public interface FriendshipRequestDao {

	FriendshipRequest getRequest(Integer u1,Integer u2);
	List<FriendshipRequest> getAllRequest(Integer u);
	void save(FriendshipRequest friend);
	public void delete(Integer id_requestor, Integer id_acceptor);

}
