package com.internetlove.cats.Entity;

import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "university")
public class UniversityEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String details;
	private String dateAdded;
	private String lastUpdated;
	private String hours;
	
	@JsonManagedReference
	@OneToMany(cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy = "university")
	private Set<FileEntity> files;
	
	//Constructors
	@OneToMany(cascade = CascadeType.MERGE)
	@JoinColumn(name = "uniId")
	private Set<CourseEntity> coursesEntity;
	
	@OneToMany(cascade = CascadeType.MERGE)
	@JoinColumn(name = "uniId")
	private Set<TeacherEntity> teachersEntity;
	
	@OneToMany(cascade = CascadeType.MERGE)
	@JoinColumn(name = "uniId")
	private Set<StudentEntity> studentEntity;
	
	public UniversityEntity() {}
	
	public UniversityEntity(int id, String name, String details, String dateAdded, Set<CourseEntity> courses,
			String lastUpdated, String hours, Set<TeacherEntity> teachers, Set<StudentEntity> students) {
		super();
		this.id = id;
		this.name = name;
		this.details = details;
		this.dateAdded = dateAdded;
		this.coursesEntity = courses;
		this.teachersEntity = teachers;
		this.studentEntity = students;
		this.lastUpdated = lastUpdated;
		this.hours = hours;
	}
	
	
	//Getters and Setters
	public Set<FileEntity> getFiles(){
		return this.files;
	}
	
	public void setFiles(FileEntity files) {
		this.files.add(files);
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	public String getDateAdded() {
		return dateAdded;
	}

	public void setDateAdded(String dateAdded) {
		this.dateAdded = dateAdded;
	}
	
	public String getLastUpdated() {
		return lastUpdated;
	}
	
	public void setLastUpdated(String lastUpdated) {
		this.lastUpdated = lastUpdated;
	}
	
	public String getHours() {
		return hours;
	}
	
	public void setHours(String hours) {
		this.hours = hours;
	}

	public Set<CourseEntity> getCourses() {
		return coursesEntity;
	}

	public void setCourses(Set<CourseEntity> courses) {
		this.coursesEntity = courses;
	}
	
	/*public void setCourses(CourseEntity courses) {
		this.coursesEntity.add(courses);
	}*/

	public Set<TeacherEntity> getTeachers() {
		return teachersEntity;
	}

	public void setTeachers(Set<TeacherEntity> teachers) {
		this.teachersEntity = teachers;
	}
	
	/*public void setTeachers(TeacherEntity teachers) {
		this.teachersEntity.add(teachers);
	}*/

	public Set<StudentEntity> getStudents() {
		return studentEntity;
	}

	public void setStudents(Set<StudentEntity> students) {
		this.studentEntity = students;
	}
	
	/*public void setStudents(StudentEntity students) {
		this.studentEntity.add(students);
	}*/
	
}