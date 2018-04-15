package com.travel.web.dao;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

import com.travel.web.model.City;

@Transactional
public interface CityDao extends CrudRepository<City, Long> {

	public City findByCityId(long city);
	public void deleteByCityId(long city);
}
