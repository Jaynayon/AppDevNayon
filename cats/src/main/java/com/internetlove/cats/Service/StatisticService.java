package com.internetlove.cats.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.internetlove.cats.Entity.StatisticEntity;
import com.internetlove.cats.Repository.StatisticRepository;

@Service
public class StatisticService {
	@Autowired
	private StatisticRepository repo;
	
	public StatisticEntity getStatistic() {
		return repo.getStatistic();
	}

}
