package com.websystique.springmvc.dao;

import com.websystique.springmvc.model.SessionUser;
import com.websystique.springmvc.model.User;

public interface SessionUserDao {
	
	
	
	void saveSession(SessionUser u);
	
	SessionUser getSessionUser(User u);
	

}
