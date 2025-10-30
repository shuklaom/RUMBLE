package onetomany.Users;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Daniel Pinilla
 *
 */

public interface UserRepository extends JpaRepository<User, Long> {
    User findById(int id);

    User findUserByUsername(String username);
    User findByEmailId(String emailId);
    User findByUsername(String username);
    User findUserByEmailId(String emailid);

}
