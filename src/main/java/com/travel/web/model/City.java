package com.travel.web.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "cities")
public class City {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "cityId")
	private long cityId;
	@NotNull
	private String name;
	private String description;

	@OneToMany(mappedBy = "city", cascade = {CascadeType.ALL})
	@JsonManagedReference
	List<Image> images = new ArrayList<Image>();

	@OneToMany(mappedBy = "city", cascade = {CascadeType.ALL})
	@JsonManagedReference(value="city_places")
	List<Place> places = new ArrayList<Place>();

	@OneToMany(mappedBy = "city", cascade = {CascadeType.ALL})
	List<Travel> travels = new ArrayList<Travel>();


	public long getCityId() {
		return cityId;
	}
	public void setCityId(long cityId) {
		this.cityId = cityId;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public List<Place> getPlaces() {
		return places;
	}
	public void setPlaces(List<Place> places) {
		this.places = places;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<Image> getImages() {
		return images;
	}
	public void setImages(List<Image> images) {
		this.images = images;
	}
	@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property="travelId", scope=Travel.class)
	public List<Travel> getTravels() {
		return travels;
	}
	public void setTravels(List<Travel> travels) {
		this.travels = travels;
	}
}
