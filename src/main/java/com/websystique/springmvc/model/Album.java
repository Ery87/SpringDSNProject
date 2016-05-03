package com.websystique.springmvc.model;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table(name="ALBUM")
public class Album{

	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_album")
	private Integer id_album;	
	
	@NotEmpty
	@Column(name="metaTag", length=100, nullable=false)
	private String metaTag;
	
	@Column(name="url", length=255)
	private String url;
	


	/*@ManyToOne(fetch=FetchType.LAZY)*/
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name = "id_user")
	private User user;
	
	
	
	
	
	public Integer getId() {
		return id_album;
	}

	public void setId(Integer id) {
		this.id_album = id;
	}

	public String getMetaTag() {
		return metaTag;
	}

	public void setMetaTag(String name) {
		this.metaTag = name;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String description) {
		this.url = description;
	}

	


	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id_album == null) ? 0 : id_album.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof Album))
			return false;
		Album other = (Album) obj;
		if (id_album == null) {
			if (other.id_album != null)
				return false;
		} else if (!id_album.equals(other.id_album))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Album [id=" + id_album + ", metaTag=" + metaTag + ", url="
				+ url +  "]";
	}

	


	
}
