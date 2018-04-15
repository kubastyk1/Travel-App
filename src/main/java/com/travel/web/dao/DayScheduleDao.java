package com.travel.web.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

import com.travel.web.model.DaySchedule;
import com.travel.web.model.Travel;

@Transactional
public interface DayScheduleDao extends CrudRepository<DaySchedule, Long> {

	public List<DaySchedule> findByTravel(Travel travel);
	public DaySchedule findByDayScheduleId(long dayScheduleId);
}
