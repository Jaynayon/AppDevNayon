package com.internetlove.cats.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.internetlove.cats.Entity.StatisticEntity;
import com.internetlove.cats.Service.StatisticService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/university")
public class StatisticController {
	@Autowired
	private StatisticService serv;
	
	@GetMapping("/statistic")
	public StatisticEntity getStatistic() {
		return serv.getStatistic();
	}

}
