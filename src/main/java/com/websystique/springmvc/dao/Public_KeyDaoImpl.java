package com.websystique.springmvc.dao;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.websystique.springmvc.model.Public_Key;

@Repository("Public_keyDao")
public class Public_KeyDaoImpl extends AbstractDao<Integer,Public_Key> implements Public_KeyDao {



	public Public_Key getKey(String service) {
		Criteria crit=createEntityCriteria();
		crit.add(Restrictions.eq("service", service));
		Public_Key pk=(Public_Key)crit.uniqueResult();

		return pk;
	}

}
