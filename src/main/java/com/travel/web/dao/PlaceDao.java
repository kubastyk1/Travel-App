package com.travel.web.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

import com.travel.web.model.City;
import com.travel.web.model.Place;

@Transactional
public interface PlaceDao extends CrudRepository<Place, Long> {

	public List<Place> findByCity(City city);
	public Place findByPlaceId(long place);
}