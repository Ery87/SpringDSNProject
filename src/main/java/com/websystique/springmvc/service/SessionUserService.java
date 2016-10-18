package com.websystique.springmvc.service;

import com.websystique.springmvc.model.SessionUser;
import com.websystique.springmvc.model.User;

public interface SessionUserService {
	
void saveSession(SessionUser u);
	
	SessionUser getSessionUser(User u,String session);
	void deleteSession(User u,String session);


	void updateSession(User u,String s);
	
	
}
