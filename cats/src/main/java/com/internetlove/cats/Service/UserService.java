package com.internetlove.cats.Service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.internetlove.cats.Entity.UniversityEntity;
import com.internetlove.cats.Entity.UserEntity;
import com.internetlove.cats.Repository.UserRepository;

@Service
public class UserService {
	@Autowired
	UserRepository urepo;
	
	//Get all users
		public List<UserEntity> getUsers(){
			return urepo.findAll();
		}
		
		//Create a university
		public UserEntity insertUser(UserEntity user) {
			return urepo.save(user);
		}
		
		//Update user
		public UserEntity updateUser(int id, UserEntity newUser) throws Exception {
			UserEntity user = new UserEntity();
			try {
				//steps in updating
				//step 1 - search the id number of the student
				user = urepo.findById(id).get();
				
				//step 2 - update the record
				user.setEmail(newUser.getEmail());
				user.setPassword(newUser.getPassword());
				
				//Step 3 - save the information and return the value
				return urepo.save(user);
			}catch(NoSuchElementException nex) {
				throw new Exception("ID Number " + id + " does not exist!");
			}
		}
		
		//Delete user
		public String deleteUser(int id) {
			String msg;
			if(urepo.findById(id).isEmpty()) {
				msg = "User ID Number " + id + " is not found!";
			}
			else {
				urepo.deleteById(id);
				msg = "User ID Number " + id + " is successfully deleted!";
			}
				
			return msg;
		}
		
}
