package com.travel.web.dao;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;
import com.travel.web.model.Coordinate;

@Transactional
public interface CoordinateDao extends CrudRepository<Coordinate, Long> {

}
