package com.internetlove.cats.Entity;

import java.sql.Blob;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "file")
public class FileEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "FILE_RECORD_ID_SEQ")
	private long id;
	private String name;
	private String type;
	@Lob
	private byte[] data;
	
	@JsonBackReference
	@ManyToOne(fetch=FetchType.LAZY)
	private UniversityEntity university;
	
	public FileEntity() {}
	
	public UniversityEntity getUniversity() {
		return university;
	}

	public void setUniversity(UniversityEntity university) {
		this.university = university;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}

	
	
}
