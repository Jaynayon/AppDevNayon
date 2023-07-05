package com.internetlove.cats.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.internetlove.cats.Entity.FileEntity;
import com.internetlove.cats.Entity.UniversityEntity;


@Repository
public interface FileRepository extends JpaRepository<FileEntity, Long>{
	Optional<FileEntity> findByName(String fileName);
	@Query(value = "SELECT * FROM File f WHERE f.university_id = ?1", nativeQuery = true)
	Optional<FileEntity> findByUniversityId(String id);
}