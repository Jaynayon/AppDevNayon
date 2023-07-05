package com.internetlove.cats.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.internetlove.cats.Entity.TeacherEntity;

@Repository
	public interface TeacherRepository extends JpaRepository<TeacherEntity, Integer>{
		
		TeacherEntity findByName(String name);
	
		
}
