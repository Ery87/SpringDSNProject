package com.websystique.springmvc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotEmpty;

//Repository public key of services
@Entity
@Table(name="PUBLIC_KEY")

public class Public_Key {
	
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Integer id;


	
	@Column(name="service")
	private String service;

	
	
	
	@Column(name="modulus")
	private String modulus;

	
	@Column(name="exponents")
	private String exponent;


	public Public_Key(){}
	
	public Public_Key(String s,String m,String e){
		this.service=s;
		this.modulus=m;
		this.exponent=e;
	}
	public String getService() {
		return service;
	}


	public void setService(String service) {
		this.service = service;
	}


	public String getModulus() {
		return modulus;
	}


	public void setModulus(String modulus) {
		this.modulus = modulus;
	}


	public String getExponent() {
		return exponent;
	}


	public void setExponent(String exponent) {
		this.exponent = exponent;
	}
	@Override
	public String toString() {
		return "Public_Key [id=" + id + ", service=" + service + ", modulus=" + modulus + ", exponent=" + exponent
				+ "]";
	}

	
}
