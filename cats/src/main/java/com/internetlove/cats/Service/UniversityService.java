package com.internetlove.cats.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.internetlove.cats.Repository.UniversityRepository;
import com.internetlove.cats.DTOs.UniversityDTO;
import com.internetlove.cats.Entity.UniversityEntity;

@Service
public class UniversityService {
	@Autowired
	UniversityRepository urepo;
	
	//Get latest record
	public String getLatestRecord() {
		return urepo.getLatestRecord();
	}
	
	//Find by name
	public List<UniversityEntity> getUniversityByName(String name) throws Exception{
		List<UniversityEntity> uni = urepo.findByName(name);
		try {
			
		}catch(NoSuchElementException nex) {
			throw new Exception("University name '" + name + "' does not exist!");
		}
		return uni;
	}
	
	//Get all universities
	public List<UniversityEntity> getUniversities(){
		return urepo.findAll();
	}
	
	//Find by id
	public UniversityEntity getUniversityById(int id) throws Exception{
		UniversityEntity uni = new UniversityEntity();
		try {
			uni = urepo.findById(id).get();
		}catch(NoSuchElementException nex) {
			throw new Exception("ID Number " + id + " does not exist!");
		}
		return uni;
	}
	
	//Find by name
	//Find by details
	//Find by date
	
	//Create a university
	/*public UniversityEntity insertUniversity(UniversityEntity university) {
		Date currentDate = new Date();
		SimpleDateFormat date = new SimpleDateFormat("MM/dd/YY");
		SimpleDateFormat hours = new SimpleDateFormat("h:mm a");
		university.setDateAdded(date.format(currentDate));
		university.setHours(hours.format(currentDate));
		return urepo.save(university);
	}*/
	
	public String insertUniversity(UniversityDTO universityDTO) {
		UniversityEntity university = new UniversityEntity();
		Date currentDate = new Date();
		SimpleDateFormat date = new SimpleDateFormat("MM/dd/YY");
		SimpleDateFormat hours = new SimpleDateFormat("h:mm a");
		university.setDateAdded(date.format(currentDate));
		university.setHours(hours.format(currentDate));
		university.setName(universityDTO.getName());
		university.setDetails(universityDTO.getDetails());
		urepo.save(university);
		return urepo.getLatestRecord(); //Returns latest id created
	}
	
	//Update university
	public UniversityEntity updateUniversity(int id, UniversityEntity newUniversity) throws Exception {
		UniversityEntity university = new UniversityEntity();
		Date currentDate = new Date();
		SimpleDateFormat date = new SimpleDateFormat("MM/dd/YY");
		SimpleDateFormat hours = new SimpleDateFormat("h:mm a");
		university.setDateAdded(date.format(currentDate));
		university.setHours(hours.format(currentDate));
		try {
			//steps in updating
			//step 1 - search the id number of the student
			university = urepo.findById(id).get();
			
			//step 2 - update the record
			university.setName(newUniversity.getName());
			university.setDetails(newUniversity.getDetails());
			university.setLastUpdated(date.format(currentDate));
			
			//Step 3 - save the information and return the value
			return urepo.save(university);
		}catch(NoSuchElementException nex) {
			throw new Exception("ID Number " + id + " does not exist!");
		}
	}
	
	//Delete university
	public String deleteUniversity(int id) {
		String msg;
		if(urepo.findById(id).isEmpty()) {
			msg = "University ID Number " + id + " is not found!";
		}
		else {
			urepo.deleteById(id);
			msg = "University ID Number " + id + " is successfully deleted!";
		}
			
		return msg;
	}

	
}
