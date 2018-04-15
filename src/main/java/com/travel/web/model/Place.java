package com.travel.web.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators.IntSequenceGenerator;

@Entity
@Table(name = "places")
public class Place {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "placeId")
	private long placeId;
	@NotNull
	private String name;
	private String category;
	@Column(columnDefinition="Decimal(1,1) default '0'")
	private double stars;
	@Column(columnDefinition="int default 0")
	private int starsNumber;
	private String ticketPrices;
	private String openingHours;
	private String amountOfTime;


	@Column(columnDefinition="TEXT")
	private String description;

	@OneToOne(fetch = FetchType.LAZY, mappedBy = "place", cascade = CascadeType.ALL)
	@JsonManagedReference(value="place_coordinate")
	private Coordinate coordinate;

	@OneToMany(mappedBy = "place", cascade = {CascadeType.ALL})
	@JsonManagedReference(value="place_images")
	List<Image> images = new ArrayList<Image>();

	@OneToMany(mappedBy = "place")
	@JsonManagedReference(value="place_comments")
	private List<Comment> comments = new ArrayList<Comment>();

	@ManyToOne
    @JoinColumn(name = "cityId")
	@JsonBackReference(value="city_places")
	City city;

	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "places")
	@JsonIdentityInfo(generator=IntSequenceGenerator.class, scope=Place.class)
	List<DaySchedule> daySchedules;

	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "likedPlaces")
	@JsonBackReference(value="likes_places")
	Set<User> likedByUsers = new HashSet<User>();

	@OneToMany(mappedBy = "place")
	@JsonManagedReference
	Set<UserReview> userReviews = new HashSet<UserReview>();

	public void addNewReview(double newReview) {
		starsNumber++;
		if (stars == 0) {
			stars = newReview;
		} else {
			stars = (stars + newReview) / 2;
		}
	}

	public void updateReview(double oldReview, double newReview) {
		double beforeStarsValue = stars - (oldReview / 2);
		stars = (beforeStarsValue + newReview) / 2;
	}

	public long getPlaceId() {
		return placeId;
	}
	public void setPlaceId(long placeId) {
		this.placeId = placeId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public double getStars() {
		return stars;
	}
	public void setStars(double stars) {
		this.stars = stars;
	}
	public List<Comment> getComments() {
		return comments;
	}
	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}
	public List<Image> getImages() {
		return images;
	}
	public void setImages(List<Image> images) {
		this.images = images;
	}
	public City getCity() {
		return city;
	}
	public void setCity(City city) {
		this.city = city;
	}
	public List<DaySchedule> getDaySchedules() {
		return daySchedules;
	}
	public void setDaySchedules(List<DaySchedule> daySchedules) {
		this.daySchedules = daySchedules;
	}
	public Set<User> getLikedByUsers() {
		return likedByUsers;
	}
	public void setLikedByUsers(Set<User> likedByUsers) {
		this.likedByUsers = likedByUsers;
	}
	public Coordinate getCoordinate() {
		return coordinate;
	}
	public void setCoordinate(Coordinate coordinate) {
		this.coordinate = coordinate;
	}
	public String getTicketPrices() {
		return ticketPrices;
	}
	public void setTicketPrices(String ticketPrices) {
		this.ticketPrices = ticketPrices;
	}
	public String getOpeningHours() {
		return openingHours;
	}
	public void setOpeningHours(String openingHours) {
		this.openingHours = openingHours;
	}
	public String getAmountOfTime() {
		return amountOfTime;
	}
	public void setAmountOfTime(String amountOfTime) {
		this.amountOfTime = amountOfTime;
	}
	public int getStarsNumber() {
		return starsNumber;
	}
	public void setStarsNumber(int starsNumber) {
		this.starsNumber = starsNumber;
	}
	public Set<UserReview> getUserReviews() {
		return userReviews;
	}
	public void setUserReviews(Set<UserReview> userReviews) {
		this.userReviews = userReviews;
	}

}
