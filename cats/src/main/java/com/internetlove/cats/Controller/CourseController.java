package com.internetlove.cats.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.internetlove.cats.Entity.CourseEntity;
import com.internetlove.cats.Service.CourseService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/course")
public class CourseController {
	
	@Autowired
	CourseService cserv;
	
	@PostMapping
	public CourseEntity postCourse(@RequestParam int id, @RequestBody CourseEntity course) throws Exception{
		return cserv.postCourse(course, id);
	}
	
	@GetMapping
	public List<CourseEntity> getAllCourses() {
		return cserv.getAlllCourses();
	}
	
	@GetMapping("/id")
	public CourseEntity getCourseById(int id) {
		return cserv.getCourseById(id);
	}
	
	@GetMapping("/code")
	public CourseEntity getCourseByCode(String code) {
		return cserv.getCourseByCode(code);
	}
	
	@PutMapping
	public CourseEntity putCourse(@RequestParam int courseid, @RequestBody CourseEntity updatedCourse) throws Exception {
		return cserv.putCourse(courseid, updatedCourse);
	}
	
	@DeleteMapping("/{courseid}")
	public String deleteCourse(@PathVariable int courseid) {
		return cserv.deleteCourse(courseid);
	}
}
