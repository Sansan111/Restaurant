package ku.cs.restaurant.controller;

import ku.cs.restaurant.entity.Menu;
import ku.cs.restaurant.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MenuController {
    private MenuService service;

    @Autowired
    public MenuController(MenuService service) {
        this.service = service;
    }

    @GetMapping("/menus")
    public List<Menu> getAllMenus() {
        return service.getAll();
    }

    @PostMapping("/menus")
    public Menu create(@RequestBody Menu menu) {
        return service.create(menu);
    }
}
