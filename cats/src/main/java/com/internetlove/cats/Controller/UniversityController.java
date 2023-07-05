package com.internetlove.cats.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.internetlove.cats.DTOs.UniversityDTO;
import com.internetlove.cats.Entity.UniversityEntity;
import com.internetlove.cats.Service.UniversityService;

import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/university")
public class UniversityController {
	@Autowired
	UniversityService userv;
	
	@GetMapping("")
	public List<UniversityEntity> getAllUniversities(){
		return userv.getUniversities();
	}
	
	/*@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public UniversityEntity getUniversityById(@PathVariable Integer id) throws Exception{
		return userv.getUniversityById(id);
	}*/
	
	@GetMapping("/{name}")
	public List<UniversityEntity> getUniversityByName(@PathVariable String name) throws Exception{
		return userv.getUniversityByName(name);
	}
	
	@PostMapping("")
	public String postUniversity(@RequestBody UniversityDTO university) {
		return userv.insertUniversity(university);
	}
	
	/*@PostMapping("/images")
	public UniversityEntity postUniversityImage(@PathVariable String image) {
		return userv.insertUniversityImage(image);
	}*/
	
	@PutMapping("")
	public UniversityEntity updateUniversity(@RequestParam int id, @RequestBody UniversityEntity university) throws Exception {
		return userv.updateUniversity(id, university);
	}
	
	@DeleteMapping("/{id}")
	public String deleteUniversity(@PathVariable int id) {
		return userv.deleteUniversity(id);
	}
		
}
