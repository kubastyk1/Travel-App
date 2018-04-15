package com.travel.web.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

import com.travel.web.model.Place;
import com.travel.web.model.User;
import com.travel.web.model.UserReview;

@Transactional
public interface UserReviewDao extends CrudRepository<UserReview, Long> {

	public List<UserReview> findByUser(User user);
	public List<UserReview> findByPlace(Place place);
	public UserReview findByPlaceIn(Place place, List<UserReview> userReviews);
	public UserReview findByUserAndPlace(User user, Place place);
}
