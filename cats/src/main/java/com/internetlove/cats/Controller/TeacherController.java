package com.internetlove.cats.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.internetlove.cats.Entity.TeacherEntity;
import com.internetlove.cats.Service.TeacherService;

@RestController
@RequestMapping("/teacher")
public class TeacherController {
	
	@Autowired
	TeacherService teserv;
	
	@PostMapping
	public TeacherEntity postTeacher(@RequestParam int id, @RequestBody TeacherEntity teacher) throws Exception{
		return teserv.postTeacher(teacher, id);
	}
	
	@GetMapping
	public List<TeacherEntity> getAllTeachers(){
		return teserv.getAllTeachers();
	}
	
	@GetMapping("/getByName")
	public TeacherEntity findByName(@RequestParam String name) {
		return teserv.findByName(name);
	}
	
	@GetMapping("/getById")
	public Optional<TeacherEntity> findByTeacherId(@RequestParam int teacherid) {
		return teserv.findByTeacherId(teacherid);
	}
	
	@PutMapping("/putTeacher")
	public TeacherEntity putTeacher(@RequestParam int teacherid, @RequestBody TeacherEntity newTeacherDetails) throws Exception{
		return teserv.putTeacher(teacherid, newTeacherDetails);
	}
	
	@DeleteMapping("/deleteTeacher/{teacherid}")
	public String deleteTeacher(@PathVariable int teacherid) {
		return teserv.deleteTeacher(teacherid);
	}

}
