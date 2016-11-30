package com.websystique.springmvc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.websystique.springmvc.dao.AlbumDao;
import com.websystique.springmvc.dao.FriendshipRequestDao;
import com.websystique.springmvc.model.FriendshipRequest;
import com.websystique.springmvc.model.User;

@Service("riendshipRequestService")
@Transactional
public class FriendshipRequestServiceImpl implements FriendshipRequestService {

	@Autowired
	FriendshipRequestDao dao;

	@Override
	public FriendshipRequest getRequest(Integer u1, Integer u2) {
		return (dao.getRequest(u1, u2));
	}

	@Override
	public List<FriendshipRequest> getAllRequest(Integer u) {
		return dao.getAllRequest(u);
	}

	@Override
	public void save(FriendshipRequest friend) {
		dao.save(friend);
	}

	@Override
	public void delete(Integer id_requestor, Integer id_acceptor) {
		dao.delete(id_requestor, id_acceptor);

	}





}
