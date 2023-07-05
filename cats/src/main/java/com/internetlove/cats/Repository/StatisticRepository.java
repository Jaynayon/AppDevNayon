package com.internetlove.cats.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import com.internetlove.cats.Entity.StatisticEntity;

@Repository
public class StatisticRepository {
	@PersistenceContext
	private EntityManager entityManager;
	
	public StatisticEntity getStatistic() {
		Query query = entityManager.createQuery("SELECT COUNT(*) FROM UniversityEntity");
		long universityCount = (Long) query.getSingleResult();
		
		query = entityManager.createQuery("SELECT COUNT(*) FROM TeacherEntity");
		long teacherCount = (Long) query.getSingleResult();
		
		query = entityManager.createQuery("SELECT COUNT(*) FROM CourseEntity");
		long courseCount = (Long) query.getSingleResult();
		
		query = entityManager.createQuery("SELECT COUNT(*) FROM StudentEntity");
		long studentCount = (Long) query.getSingleResult();
		
		StatisticEntity statistic = new StatisticEntity();
		
		statistic.setUniversityCount(universityCount);
		statistic.setTeacherCount(teacherCount);
		statistic.setCourseCount(courseCount);
		statistic.setStudentCount(studentCount);
		
		return statistic;
	}
	
}
