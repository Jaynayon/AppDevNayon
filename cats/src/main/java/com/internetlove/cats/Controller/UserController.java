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

import com.internetlove.cats.Entity.UniversityEntity;
import com.internetlove.cats.Entity.UserEntity;
import com.internetlove.cats.Service.UniversityService;
import com.internetlove.cats.Service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	UserService userv;
	
	@GetMapping("")
	public List<UserEntity> getAllUsers(){
		return userv.getUsers();
	}
	
	@PostMapping("")
	public UserEntity postUser(@RequestBody UserEntity user) {
		return userv.insertUser(user);
	}
	
	@PutMapping("")
	public UserEntity updateUser(@RequestParam int id, @RequestBody UserEntity user) throws Exception {
		return userv.updateUser(id, user);
	}
	
	@DeleteMapping("/{id}")
	public String deleteUniversity(@PathVariable int id) {
		return userv.deleteUser(id);
	}
	
}
