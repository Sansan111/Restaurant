package ku.cs.restaurant.service;

import ku.cs.restaurant.entity.Menu;
import ku.cs.restaurant.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class MenuService {
    private MenuRepository repository;

    @Autowired
    public MenuService(MenuRepository repository) {
        this.repository = repository;
    }

    public List<Menu> getAll() {
        return repository.findAll();
    }

    public Menu create(Menu menu) {
        menu.setCreatedAt(Instant.now());
        Menu record = repository.save(menu);
        return record;
    }
}
