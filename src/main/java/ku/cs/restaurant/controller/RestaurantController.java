package ku.cs.restaurant.controller;

import ku.cs.restaurant.dto.RestaurantRequest;
import ku.cs.restaurant.entity.Restaurant;
import ku.cs.restaurant.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class RestaurantController {
    private RestaurantService service;

    @Autowired
    public RestaurantController(RestaurantService service) {
        this.service = service;
    }

    @GetMapping("/restaurants")
    public Page<Restaurant> getAllRestaurants(
            @RequestParam(required = false) Integer offset,
            @RequestParam(required = false) Integer pageSize,
            @RequestParam(required = false) String sortBy) {
        
        if (offset == null) offset = 0;
        if (pageSize == null) pageSize = 10;
        if (!StringUtils.hasText(sortBy)) sortBy = "name";
        
        return service.getRestaurantsPage(PageRequest.of(offset, pageSize, Sort.by(sortBy)));
    }

    @GetMapping("/restaurants/browser")
    public String getRestaurantsForBrowser() {
        return "Welcome to Restaurant API!<br><br>" +
               "Available endpoints:<br>" +
               "• GET /api/restaurants - Get all restaurants (requires JWT token)<br>" +
               "• POST /api/auth/login - Login to get JWT token<br>" +
               "• POST /api/auth/signup - Register new user<br><br>" +
               "To access restaurants, please login first and use the JWT token in Authorization header.";
    }

    @PostMapping("/restaurants")
    public Restaurant create(@RequestBody RestaurantRequest restaurant) {
        return service.create(restaurant);
    }

    @GetMapping("/restaurants/{id}")
    public Restaurant getRestaurantById(@PathVariable UUID id) {
        return service.getRestaurantById(id);
    }

    @PutMapping("/restaurants")
    public Restaurant update(@RequestBody Restaurant restaurant) {
        return service.update(restaurant);
    }

    @DeleteMapping("/restaurants/{id}")
    public Restaurant delete(@PathVariable UUID id) {
        return service.delete(id);
    }

    @GetMapping("/restaurants/name/{name}")
    public Restaurant getRestaurantByName(@PathVariable String name) {
        return service.getRestaurantByName(name);
    }

    @GetMapping("/restaurants/location/{location}")
    public List<Restaurant> getRestaurantByLocation(@PathVariable String location) {
        return service.getRestaurantByLocation(location);
    }
}
