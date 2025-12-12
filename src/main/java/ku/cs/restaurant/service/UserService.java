package ku.cs.restaurant.service;

import jakarta.persistence.EntityExistsException;
import ku.cs.restaurant.dto.SignupRequest;
import ku.cs.restaurant.entity.User;
import ku.cs.restaurant.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class UserService {
    private UserRepository userRepository;
    private PasswordEncoder encoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    public boolean userExists(String username) {
        return userRepository.existsByUsername(username);
    }

    public void createUser(SignupRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new EntityExistsException("Username is already taken!");
        }
        User dao = new User();
        dao.setUsername(request.getUsername());
        dao.setPassword(encoder.encode(request.getPassword()));
        dao.setName(request.getName());
        dao.setRole("ROLE_USER");
        dao.setProvider("local");
        dao.setCreatedAt(Instant.now());
        userRepository.save(dao);
    }

    public User getUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        return user;
    }

    public User findOrCreateGoogleUser(String email, String name) {
        User user = userRepository.findByUsername(email);
        if (user == null) {
            User dao = new User();
            dao.setUsername(email);
            dao.setName(name);
            dao.setPassword(encoder.encode("NO_PASSWORD"));
            dao.setRole("ROLE_USER");
            dao.setProvider("google");
            dao.setCreatedAt(Instant.now());
            user = userRepository.save(dao);
        }
        return user;
    }
}
