 package com.websystique.springmvc.model;


import java.math.BigInteger;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;


import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table(name="USER")
public class User {

	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_user")
	private BigInteger id_user;

	
	
	@NotEmpty
	@Column(name="firstname", nullable=false)
	private String firstname;

	@NotEmpty
	@Column(name="lastname", nullable=false)
	private String lastname;

	@NotEmpty
	@Column(name="email", unique=true,nullable=false)
	private String email;
	
	@NotEmpty
	@Column(name="birth_day", nullable=false)
	private String birth_day;
	
	@NotEmpty
	@Column(name="city", nullable=false)
	private String city;
	
	@NotEmpty
	@Column(name="pw", nullable=false)
	private String pw;

	@Lob @Basic(fetch = FetchType.LAZY)
	@Column(name="photo", nullable=false)
	private byte[] photo;
	
	
	public User(){}
	
	public BigInteger getId() {
		return id_user;
	}

	public void setId(BigInteger id) {
		this.id_user = id;
	}

	/*@OneToMany(fetch = FetchType.EAGER, mappedBy = "user", cascade = CascadeType.ALL)
	private Collection<Album> albums = new LinkedHashSet<Album>();
	
 @LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)

    private Set<Album> albums = new HashSet<Album>();*/

	public String getFirstName() {
		return firstname;
	}

	public void setFirstName(String firstName) {
		this.firstname = firstName;
	}

	public String getLastName() {
		return lastname;
	}

	public void setLastName(String lastName) {
		this.lastname = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setBirth_day(String bd){
		this.birth_day=bd;
	}
	
	public String getBirth_day(){
		return birth_day;
	}
	
	public void setCity(String city){
		this.city=city;
	}
	
	public String getCity(){
		return city;
	}
	
	public void setPw(String pw){
		this.pw=pw;
	}
	
	public String getPw(){
		return pw;
	}
	
	public byte[] getPhoto() {
		return photo;
	}

	public void setPhoto(byte[] photo) {
		this.photo=photo;
	}


	/*public Collection<Album> getAlbum(){
		return albums;
	}
	
	public void setAlbum(Collection<Album> album){
		this.albums=album;
	}*/
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id_user == null) ? 0 : id_user.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof User))
			return false;
		User other = (User) obj;
		if (id_user == null) {
			if (other.id_user != null)
				return false;
		} else if (!id_user.equals(other.id_user))
			return false;
		
		return true;
	}

	@Override
	public String toString() {
		return "User [id=" + id_user + ", email=" + email + ", firstName=" + firstname + ", lastName=" + lastname
				+ ", city=" + city +", birth_day=" + birth_day+ "]";
	}

	
	
	
}
