package com.travel.web.dao;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

import com.travel.web.model.User;

@Transactional
public interface UserDao extends CrudRepository<User, Long> {

	public User findByName(String name);
	public User findByUserId(long userId);
}
