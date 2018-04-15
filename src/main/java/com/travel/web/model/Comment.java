package com.travel.web.model;

import java.util.ArrayList;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "comments")
public class Comment {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "commentId")
	private int commentId;
	@NotNull
	private String comment;
	private ArrayList<Comment> replies;

	@ManyToOne
    @JoinColumn(name = "placeId")
	@JsonBackReference(value="place_comments")
	private Place place;

	@ManyToOne
    @JoinColumn(name = "userId")
	private User author;

	public int getCommentId() {
		return commentId;
	}
	public void setCommentId(int commentId) {
		this.commentId = commentId;
	}
	public Place getPlace() {
		return place;
	}
	public void setPlace(Place place) {
		this.place = place;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public ArrayList<Comment> getReplies() {
		return replies;
	}
	public void setReplies(ArrayList<Comment> replies) {
		this.replies = replies;
	}
	public User getAuthor() {
		return author;
	}
	public void setAuthor(User author) {
		this.author = author;
	}

}
