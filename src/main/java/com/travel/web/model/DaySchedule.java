package com.travel.web.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "daySchedules")
public class DaySchedule {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "dayScheduleId")
	private long dayScheduleId;
	private Date date;

	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinTable(
	        name = "Day_Schedule_Place",
	        joinColumns = { @JoinColumn(name = "day_schedule_id") },
	        inverseJoinColumns = { @JoinColumn(name = "place_id") }
	    )
	List<Place> places = new ArrayList<Place>();

	@ManyToOne
    @JoinColumn(name = "travelId")
	@JsonBackReference
	Travel travel;

	public long getDayScheduleId() {
		return dayScheduleId;
	}
	public void setDayScheduleId(long dayScheduleId) {
		this.dayScheduleId = dayScheduleId;
	}
	public List<Place> getPlaces() {
		return places;
	}
	public void setPlaces(List<Place> places) {
		this.places = places;
	}
	public Travel getTravel() {
		return travel;
	}
	public void setTravel(Travel travel) {
		this.travel = travel;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}

}
