package com.websystique.springmvc.service;

import com.websystique.springmvc.model.SessionUser;
import com.websystique.springmvc.model.User;

public interface SessionUserService {

	void saveSession(SessionUser u);

	SessionUser getSessionUser(User u);
	void deleteSession(User u);


	void updateSession(User u,String s);


}
