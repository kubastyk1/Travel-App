package com.travel.web.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "userReviwes")
public class UserReview {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "userReviewId")
	private int userReviewId;
	private double review;

	@ManyToOne
    @JoinColumn(name = "userId")
	@JsonBackReference(value="user_userReviews")
	private User user;

	@ManyToOne
    @JoinColumn(name = "placeId")
	@JsonBackReference(value="place_userReviews")
	private Place place;

	public int getUserReviewId() {
		return userReviewId;
	}
	public void setUserReviewId(int userReviewId) {
		this.userReviewId = userReviewId;
	}
	public double getReview() {
		return review;
	}
	public void setReview(double review) {
		this.review = review;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Place getPlace() {
		return place;
	}
	public void setPlace(Place place) {
		this.place = place;
	}

}
