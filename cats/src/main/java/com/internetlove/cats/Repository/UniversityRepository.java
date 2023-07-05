package com.internetlove.cats.Repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.internetlove.cats.Entity.UniversityEntity;

@Repository
public interface UniversityRepository extends JpaRepository<UniversityEntity,Integer>{
	//UniversityEntity findByName(String name);
	@Query(value = "SELECT * FROM University u WHERE u.name LIKE %?1%", nativeQuery = true)
	List<UniversityEntity> findByName(String name);
	@Query(value = "SELECT id FROM db_nayon_sims.university ORDER BY ID DESC LIMIT 1", nativeQuery = true)
	String getLatestRecord();
}
