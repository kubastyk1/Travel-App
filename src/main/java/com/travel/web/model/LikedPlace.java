package com.travel.web.model;

import java.util.List;
import java.util.Set;

public class LikedPlace {

	private List<Place> places;
	private Set<Place> likedPlaces;

	public List<Place> getPlaces() {
		return places;
	}
	public void setPlaces(List<Place> places) {
		this.places = places;
	}
	public Set<Place> getLikedPlaces() {
		return likedPlaces;
	}
	public void setLikedPlaces(Set<Place> likedPlaces) {
		this.likedPlaces = likedPlaces;
	}

}
