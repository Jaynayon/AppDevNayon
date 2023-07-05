package com.internetlove.cats.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.internetlove.cats.Entity.CourseEntity;

@Repository
public interface CourseRepository extends JpaRepository<CourseEntity, Integer>{
	CourseEntity findByCode(String code);
}