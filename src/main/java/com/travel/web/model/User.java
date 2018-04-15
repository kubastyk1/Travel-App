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
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators.IntSequenceGenerator;

@Entity
@Table(name = "users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "userId")
	private long userId;
	@NotNull
	private String name;
	private String image;
	private String password;
	private String email;
	private boolean isAdmin;
	private boolean isBlocked;

	@OneToMany(mappedBy = "author")
	@JsonIdentityInfo(generator=IntSequenceGenerator.class, scope=User.class)
	private List<Comment> comments = new ArrayList<Comment>();

	@OneToMany(mappedBy = "user")
	@JsonManagedReference
	List<Travel> travels = new ArrayList<Travel>();

	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinTable(
	        name = "User_Place",
	        joinColumns = { @JoinColumn(name = "user_id") },
	        inverseJoinColumns = { @JoinColumn(name = "place_id") }
	    )
	@JsonBackReference(value="likes_places")
	Set<Place> likedPlaces = new HashSet<Place>();

	@OneToMany(mappedBy = "user")
	@JsonManagedReference
	Set<UserReview> userReviews = new HashSet<UserReview>();

	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public List<Comment> getComments() {
		return comments;
	}
	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public List<Travel> getTravels() {
		return travels;
	}
	public void setTravels(List<Travel> travels) {
		this.travels = travels;
	}
	public Set<Place> getLikedPlaces() {
		return likedPlaces;
	}
	public Set<Place> getLikedPlacesByCityId(long cityId) {
		Set<Place> likedPlacesInCity = new HashSet<Place>();

		for(Place place : likedPlaces) {
			if(place.getCity().getCityId() == cityId) {
				likedPlacesInCity.add(place);
			}
		}

		return likedPlacesInCity;
	}
	public void setLikedPlaces(Set<Place> likedPlaces) {
		this.likedPlaces = likedPlaces;
	}
	public Set<UserReview> getUserReviews() {
		return userReviews;
	}
	public void setUserReviews(Set<UserReview> userReviews) {
		this.userReviews = userReviews;
	}
	public boolean isAdmin() {
		return isAdmin;
	}
	public void setAdmin(boolean isAdmin) {
		this.isAdmin = isAdmin;
	}
	public boolean isBlocked() {
		return isBlocked;
	}
	public void setBlocked(boolean isBlocked) {
		this.isBlocked = isBlocked;
	}
	
}
