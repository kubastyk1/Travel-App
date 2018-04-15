package com.travel.web.api;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.joda.time.DateTime;
import org.joda.time.Days;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travel.web.dao.CityDao;
import com.travel.web.dao.CommentDao;
import com.travel.web.dao.CoordinateDao;
import com.travel.web.dao.DayScheduleDao;
import com.travel.web.dao.ImageDao;
import com.travel.web.dao.PlaceDao;
import com.travel.web.dao.TravelDao;
import com.travel.web.dao.UserDao;
import com.travel.web.dao.UserReviewDao;
import com.travel.web.model.City;
import com.travel.web.model.Comment;
import com.travel.web.model.Coordinate;
import com.travel.web.model.DaySchedule;
import com.travel.web.model.Image;
import com.travel.web.model.LikedPlace;
import com.travel.web.model.Place;
import com.travel.web.model.Travel;
import com.travel.web.model.User;
import com.travel.web.model.UserReview;

@RestController
@RequestMapping(path = "/travel")
public class TravelApi {

	@Autowired
	private CityDao cityDao;
	@Autowired
	private CommentDao commentDao;
	@Autowired
	private DayScheduleDao dayScheduleDao;
	@Autowired
	private PlaceDao placeDao;
	@Autowired
	private TravelDao travelDao;
	@Autowired
	private UserDao userDao;
	@Autowired
	private ImageDao imageDao;
	@Autowired
	private UserReviewDao userReviewDao;
	@Autowired
	private CoordinateDao coordinateDao;
	
	@PersistenceContext
	private EntityManager manager;
	private long loggedInUserId = 1;

	@GetMapping(path = "/cities")
	public List<City> getCities() {

		List<City> cities = new ArrayList<City>();
		cityDao.findAll().forEach(cities::add);
		return cities;
	}

	@GetMapping(path = "/places/{cityId}")
	public LikedPlace getPlaces(@PathVariable("cityId") City city, Model model) {
		LikedPlace likedPlace = new LikedPlace();
		List<Place> places = placeDao.findByCity(city);
		Set<Place> likedPlaces = new HashSet<Place>();
		if (loggedInUserId != 0) {
			likedPlaces = userDao.findByUserId(loggedInUserId).getLikedPlacesByCityId(city.getCityId());
		}

		places.removeAll(likedPlaces);

		likedPlace.setLikedPlaces(likedPlaces);
		likedPlace.setPlaces(places);

		return likedPlace;
	}

	@GetMapping(path = "/placeDetails/{placeId}")
	public Place getPlaceDetails(@PathVariable("placeId") long place, Model model) {

		Place newPlace = placeDao.findByPlaceId(place);
		UserReview userReview = userReviewDao.findByUserAndPlace(userDao.findByUserId(loggedInUserId), newPlace);
		Set<UserReview> userReviews = new HashSet<UserReview>();
		userReviews.add(userReview);
		newPlace.setUserReviews(userReviews);
		return newPlace;
	}

	@GetMapping(path = "/cityDetails/{cityId}")
    public City getCityDetails(@PathVariable("cityId") long city, Model model) {

		return cityDao.findByCityId(city);
    }
	
	@PostMapping(path = "/createCity")
	public boolean createCity(String name, String imageUrl, String description) {
		
		City city = new City();
		city.setName(name);
		city.setDescription(description);
		cityDao.save(city);
		
		if (imageUrl != null) {
			Image image = new Image();
			image.setImageUrl(imageUrl);
			image.setCity(city);
			imageDao.save(image);
		}
		
		return true;
	}

	@GetMapping(path = "/createPlace")
	public List<City> createPlace() {
		
		List<City> cities = new ArrayList<City>();
		cityDao.findAll().forEach(cities::add);
		return cities;
	}

	@PostMapping(path = "/createPlace")
	public boolean createPlace(String name, String category, String description, String imageUrl, String city, String ticketPrices, String openingHours, String latitude, String longitude) {
		
		Place place = new Place();
		place.setCategory(category);
		place.setDescription(description);
		place.setName(name);
		place.setStars(0);
		place.setCity(cityDao.findOne(Long.parseLong(city)));

		if (ticketPrices != null) {
			String decodedTicketPrices = ticketPrices.replace("\n", "<br />");
			place.setTicketPrices(decodedTicketPrices);
		}
		if (openingHours != null) {
			String decodedOpeningHours = openingHours.replace("\n", "<br />");
			place.setOpeningHours(decodedOpeningHours);	
		}
		
		placeDao.save(place);

		if (imageUrl != null) {
			Image image = new Image();
			image.setImageUrl(imageUrl);
			image.setCity(cityDao.findOne(Long.parseLong(city)));
			image.setPlace(placeDao.findOne((long) place.getPlaceId()));
			imageDao.save(image);
		}
		
		if (Double.parseDouble(latitude) != 0 && Double.parseDouble(longitude) != 0) {
			Coordinate coordinate = new Coordinate();
			coordinate.setLatitude(Double.parseDouble(latitude));
			coordinate.setLongitude(Double.parseDouble(longitude));
			coordinate.setPlace(place);
			coordinateDao.save(coordinate);
		}
		return true;
	}

	@PostMapping(path = "/createImage")
	public void createImage(Image image) {
		
		imageDao.save(image);
	}

	@GetMapping(path = "/createTravel")
	public List<City> createTravel() {
		
		List<City> cities = new ArrayList<City>();
		cityDao.findAll().forEach(cities::add);
		return cities;
	}

	@PostMapping(path = "/createTravel")
	public boolean createTravel(Travel travel) {
		
		travel.setUser(userDao.findByUserId(loggedInUserId));
		travelDao.save(travel);

		List<DaySchedule> daySchedules = new ArrayList<DaySchedule>();
		for (int i = 0; i < Days.daysBetween(new DateTime(travel.getFromDate()), new DateTime(travel.getToDate()))
				.getDays() + 1; i++) {
			DaySchedule daySchedule = new DaySchedule();
			daySchedule.setTravel(travel);
			daySchedule.setDate(new DateTime(travel.getFromDate()).plusDays(i).toDate());
			
			List<Place> cityPlaces = placeDao.findByCity(travel.getCity());
			List<Place> placesToAdd = new ArrayList<Place>();
			if (cityPlaces.size() != 0) {
				placesToAdd.add(cityPlaces.get(0));
				daySchedule.setPlaces(placesToAdd);
			}
			dayScheduleDao.save(daySchedule);
			daySchedules.add(daySchedule);
		}
		travel.setDaySchedules(daySchedules);
		travelDao.save(travel);
		
		return true;
	}

	@PostMapping(path = "/register")
	public boolean register(User user) {
		
		userDao.save(user);
		loggedInUserId = user.getUserId();
		return true;
	}

	@PostMapping(path = "/login")
	public String login(User logUser) {

		if (userDao.findByName(logUser.getName()) == null) {
			return null;
		} 
		
		if (userDao.findByName(logUser.getName()).isBlocked()) {
			return "Blocked";
		}
		
		User user = userDao.findByName(logUser.getName());
		loggedInUserId = user.getUserId();
		return user.getPassword();
	}

	@PostMapping(path = "/logoff")
	public void logoff() {
		
		loggedInUserId = 0;
	}
	
	@PostMapping(path = "/isBlocked")
	public boolean changeBlockedUser(long userId, boolean isBlocked) {
		
		User user = userDao.findByUserId(userId);
		user.setBlocked(!isBlocked);
		userDao.save(user);
		return true;
	}
	
	@GetMapping(path = "/travels")
	public List<Travel> getUserTravelsList() {
		
		List<Travel> travels = new ArrayList<Travel>();
		travelDao.findByUser(userDao.findByUserId(loggedInUserId)).forEach(travels::add);
		return travels;
	}

	@GetMapping(path = "/travel/{travelId}")
	public Travel getTravel(@PathVariable("travelId") long travelId) {

		Travel travel = travelDao.findByTravelId(travelId);

		List<DaySchedule> daySchedules = travel.getDaySchedules();
		DaySchedule daySchedule = new DaySchedule();
		daySchedule.setPlaces(placeDao.findByCity(travel.getCity()));
		daySchedules.add(daySchedule);

		return travel;
	}

	@PostMapping(path = "/likePlace")
	public void like(boolean isLiked, long placeId) {
		
		Place place = placeDao.findByPlaceId(placeId);
		User user = userDao.findByUserId(loggedInUserId);
		Set<User> users = place.getLikedByUsers();
		Set<Place> places = user.getLikedPlaces();

		if (isLiked) {
			users.add(user);
			places.add(place);
		} else {
			users.remove(user);
			places.remove(place);
		}

		placeDao.save(place);
		userDao.save(user);
	}

	@GetMapping(path = "/favorites")
	public Set<Place> getFavorites() {

		return userDao.findByUserId(loggedInUserId).getLikedPlaces();
	}

	@PostMapping(path = "/updateDaySchedule")
	public void updateDaySchedule(long placeId, long dayScheduleId, int lastX, int lastY, int nextX, int nextY) {

		DaySchedule daySchedule = dayScheduleDao.findByDayScheduleId(dayScheduleId);
		List<Place> places = daySchedule.getPlaces();

		if (lastX != nextX) { // move to other daySchedule
			places.add(nextY, placeDao.findByPlaceId(placeId));
		} else { // same day daySchedule, only change place
			places.remove(lastY);
			places.add(nextY, placeDao.findByPlaceId(placeId));
		}

		dayScheduleDao.save(daySchedule);
	}

	@PostMapping(path = "/reviewPlace")
	public void reviewPlace(double starsValue, long placeId) {
		
		Place place = placeDao.findByPlaceId(placeId);
		UserReview userReview = userReviewDao.findByUserAndPlace(userDao.findByUserId(loggedInUserId), place);

		if (userReview == null) {
			UserReview newUserReview = new UserReview();
			newUserReview.setPlace(placeDao.findByPlaceId(placeId));
			newUserReview.setUser(userDao.findByUserId(loggedInUserId));
			newUserReview.setReview(starsValue);
			userReviewDao.save(newUserReview);

			place.addNewReview(starsValue);
			placeDao.save(place);
		} else {
			place.updateReview(userReview.getReview(), starsValue);

			userReview.setReview(starsValue);
			userReviewDao.save(userReview);
		}
	}

	@PostMapping(path = "/writeComment")
	public List<Comment> writeComment(long placeId, String commentMessage) {

		Place place = placeDao.findByPlaceId(placeId);
		Comment comment = new Comment();
		comment.setAuthor(userDao.findByUserId(loggedInUserId));
		comment.setComment(commentMessage);
		comment.setPlace(place);

		commentDao.save(comment);
		return commentDao.findByPlace(place);
	}
	
	@PostMapping(path = "/updateUserSettings")
	public boolean updateUserSettings(User user) {

		User oldUser = userDao.findByUserId(loggedInUserId);
		if (user.getPassword() != null)
			oldUser.setPassword(user.getPassword());
		if (user.getImage() != null)
			oldUser.setImage(user.getImage());
		
		userDao.save(oldUser);
		return true;
	}
	
	@GetMapping(path = "/getLoggedUser")
	public long getLoggedUser() {

		return loggedInUserId;
	}

	@GetMapping(path = "/getIsAdmin")
	public boolean getIsAdmin() {

		return userDao.findByUserId(loggedInUserId).isAdmin();
	}
	
	@GetMapping(path = "/admin/cities")
	public ArrayList<City> getAdminCities() {

		return (ArrayList<City>) cityDao.findAll();
	}
	
	@GetMapping(path = "/admin/places")
	public ArrayList<Place> getAdminPlaces() {

		return (ArrayList<Place>) placeDao.findAll();
	}
	
	@GetMapping(path = "/admin/travels")
	public ArrayList<Travel> getAdminTravels() {

		return (ArrayList<Travel>) travelDao.findAll();
	}
	
	@GetMapping(path = "/admin/users")
	public ArrayList<User> getAdminUsers() {

		return (ArrayList<User>) userDao.findAll();
	}
	
	@GetMapping(path = "/admin/comments")
	public ArrayList<Comment> getAdminComments() {

		return (ArrayList<Comment>) commentDao.findAll();
	}
	
	@GetMapping(path = "/admin/images")
	public ArrayList<Image> getAdminImages() {

		return (ArrayList<Image>) imageDao.findAll();
	}
	
	@PostMapping(path = "/admin/cities")
	public boolean deleteCityAdmin(City city) {
	
		cityDao.deleteByCityId(city.getCityId());
		return true;
	}

	@PostMapping(path = "/editCity")
	public boolean editCity(City city) {
	
		cityDao.save(city);
		return true;
	}
	
	@GetMapping(path = "admin/city/{cityId}")
    public City editCity(@PathVariable("cityId") long cityId, Model model) {

		return cityDao.findByCityId(cityId);
    }
	
	@PostMapping(path = "/editPlace")
	public boolean editPlace(Place place) {
	
		placeDao.save(place);
		return true;
	}
	
	@GetMapping(path = "admin/place/{placeId}")
    public Place editPlace(@PathVariable("placeId") long placeId, Model model) {

		return placeDao.findByPlaceId(placeId);
    }
	
	@PostMapping(path = "/editComment")
	public boolean editComment(int commentId, String comment) {
		Comment commentToSave = commentDao.findByCommentId(commentId);
		commentToSave.setComment(comment);
		commentDao.save(commentToSave);
		return true;
	}
	
	@GetMapping(path = "admin/comment/{commentId}")
    public Comment editComment(@PathVariable("commentId") int commentId, Model model) {

		return commentDao.findByCommentId(commentId);
    }
	
	@PostMapping(path = "/editImage")
	public boolean editImage(Image image) {
	
		imageDao.save(image);
		return true;
	}
	
	@GetMapping(path = "admin/image/{imageId}")
    public Image editImage(@PathVariable("imageId") long imageId, Model model) {

		return imageDao.findByImageId(imageId);
    }
	
}
