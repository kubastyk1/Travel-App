package com.travel.web.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

import com.travel.web.model.Comment;
import com.travel.web.model.Place;

@Transactional
public interface CommentDao extends CrudRepository<Comment, Long> {

	public List<Comment> findByPlace(Place place);
	public Comment findByCommentId(int commentId);
}
