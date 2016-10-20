package com.websystique.springmvc.dao;

import com.websystique.springmvc.model.SessionUser;
import com.websystique.springmvc.model.User;

public interface SessionUserDao {



	void saveSession(SessionUser u);
	void deleteSession(User u);
	SessionUser getSessionUser(User u);


}
