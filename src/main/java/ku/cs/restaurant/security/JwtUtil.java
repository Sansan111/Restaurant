package ku.cs.restaurant.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class JwtUtil {

    // Key: token -> value: username
    // we usually store these tokens in an in-memory database such as Redis
    private final Map<String, String> tokenStore = new ConcurrentHashMap<>();

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private int jwtExpirationMs;

    private SecretKey key;

    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String username) {
        String token = Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(key, Jwts.SIG.HS256)
                .compact();
        
        tokenStore.put(token, username);
        return token;
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parser()
                .verifyWith(key).build()
                .parseSignedClaims(token)
                .getPayload().getSubject();
    }

    public boolean validateJwtToken(String token) {
        try {
            // Check if token is in store (not invalidated)
            if (!tokenStore.containsKey(token)) {
                return false;
            }
            
            Jwts.parser()
                    .verifyWith(key).build()
                    .parseSignedClaims(token);
            return true;
        } catch (SecurityException | MalformedJwtException | ExpiredJwtException | 
                 UnsupportedJwtException | IllegalArgumentException e) {
            // Let the exception propagate to be handled by GlobalExceptionHandler
            throw e;
        }
    }

    public void invalidateToken(String token) {
        tokenStore.remove(token);
    }
}

