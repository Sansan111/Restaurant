package ku.cs.restaurant.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import java.time.Instant;
import java.util.UUID;

@Data
@Entity
public class Menu {
    @Id
    @GeneratedValue
    private UUID id;

    private String name;
    private double price;
    private String description;
    private Instant createdAt;
}
