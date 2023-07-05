package com.internetlove.cats.Entity;

import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class UserEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String email;
	private String password;
	private boolean student;
	private boolean teacher;
	private boolean admin;
	
	
	public UserEntity() {}
	
	public UserEntity(int id, String email, String password, boolean isStudent, boolean isTeacher, boolean isAdmin) {
		super();
		this.id = id;
		this.email = email;
		this.password = password;
		this.student = isStudent;
		this.teacher = isTeacher;
		this.admin = isAdmin;
	}

	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isStudent() {
		return student;
	}

	public void setStudent(boolean isStudent) {
		this.student = isStudent;
	}

	public boolean isTeacher() {
		return teacher;
	}

	public void setTeacher(boolean isTeacher) {
		this.teacher = isTeacher;
	}

	public boolean isAdmin() {
		return admin;
	}

	public void setAdmin(boolean isAdmin) {
		this.admin = isAdmin;
	}
	
	
}