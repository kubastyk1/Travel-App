package com.travel.web.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "coordinates")
public class Coordinate {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "coordinateId")
	private long coordinateId;
	private double longitude;
	private double latitude;

	@OneToOne(fetch = FetchType.LAZY)
	@JsonBackReference(value="place_coordinate")
	Place place;

	public long getCoordinateId() {
		return coordinateId;
	}
	public void setCoordinateId(long coordinateId) {
		this.coordinateId = coordinateId;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public Place getPlace() {
		return place;
	}
	public void setPlace(Place place) {
		this.place = place;
	}

}
