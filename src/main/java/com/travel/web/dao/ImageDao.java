package com.travel.web.dao;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

import com.travel.web.model.Image;

@Transactional
public interface ImageDao extends CrudRepository<Image, Long> {

	public Image findByImageId(long imageId);
}
