package com.websystique.springmvc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotEmpty;

//Repository friend request
@Entity
@Table(name="FRIENDSHIP_REQUEST")
public class FriendshipRequest {
	
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Integer id;	

	@Column(name="id_requestor")
	private Integer user_requestor;
	
	@Column(name="id_acceptor")
	private Integer user_acceptor;
	
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "FriendshipRequest [id=" + id + ", user_requestor=" + user_requestor + ", user_acceptor=" + user_acceptor
				 + "]";
	}

	public Integer getUser_requestor() {
		return user_requestor;
	}

	public void setUser_requestor(Integer user_requestor) {
		this.user_requestor = user_requestor;
	}

	public Integer getUser_acceptor() {
		return user_acceptor;
	}

	public void setUser_acceptor(Integer user_acceptor) {
		this.user_acceptor = user_acceptor;
	}

	
}
