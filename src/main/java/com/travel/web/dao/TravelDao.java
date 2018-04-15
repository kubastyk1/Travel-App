package com.travel.web.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

import com.travel.web.model.Travel;
import com.travel.web.model.User;

@Transactional
public interface TravelDao extends CrudRepository<Travel, Long> {

	public List<Travel> findByUser(User user);
	public Travel findByTravelId(long travelId);
}
