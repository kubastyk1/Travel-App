package com.travel.web.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "travels")
public class Travel {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "travelId")
	private long travelId;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date fromDate;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date toDate;

	@ManyToOne
	@JoinColumn(name = "cityId")
	City city;

	@ManyToOne
	@JoinColumn(name = "userId")
	@JsonBackReference
	User user;

	@OneToMany(mappedBy = "travel")
	@JsonManagedReference
	List<DaySchedule> daySchedules = new ArrayList<DaySchedule>();

	public long getTravelId() {
		return travelId;
	}
	public void setTravelId(long travelId) {
		this.travelId = travelId;
	}
	public List<DaySchedule> getDaySchedules() {
		return daySchedules;
	}
	public void setDaySchedules(List<DaySchedule> daySchedules) {
		this.daySchedules = daySchedules;
	}
	public Date getFromDate() {
		return fromDate;
	}
	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}
	public Date getToDate() {
		return toDate;
	}
	public void setToDate(Date toDate) {
		this.toDate = toDate;
	}
	public City getCity() {
		return city;
	}
	public void setCity(City city) {
		this.city = city;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}


}
