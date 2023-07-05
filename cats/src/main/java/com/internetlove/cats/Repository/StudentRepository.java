package com.internetlove.cats.Repository;

import com.internetlove.cats.Entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<StudentEntity,Integer> {

}
