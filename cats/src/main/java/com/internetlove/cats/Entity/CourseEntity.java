package com.internetlove.cats.Entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "course")
public class CourseEntity {
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "coursecode")
	private String code;
	
	@Column(name = "coursedesc")
	private String desc;
	
	@ManyToMany(cascade = CascadeType.MERGE)
	private Set<TeacherEntity> teachers;
	
	@ManyToMany(cascade = CascadeType.MERGE)
	private Set<StudentEntity> students;
	
	public CourseEntity() {}
	public CourseEntity(int id, String code, String desc) {
		super();
		this.id = id;
		this.code = code;
		this.desc = desc;
	}
	
	public int getId() {return id;}
	public String getCourseCode() {return code;}
	public String getCourseDesc() {return desc;}
	public Set<StudentEntity> getStudents() {return students;}
	public Set<TeacherEntity> getTeachers() {return teachers;}
	public void setCourseCode(String code) {this.code = code;}
	public void setCourseDesc(String desc) {this.desc = desc;}
	public void setStudent(Set<StudentEntity> students) {this.students = students;}
	public void setTeacher(Set<TeacherEntity> teachers) {this.teachers = teachers;}
}
