package onetomany.roomba;


import org.springframework.data.jpa.repository.JpaRepository;
public interface roombaRepository  extends JpaRepository<roomba, Long>{


    roomba findById(int id);
    roomba findByUniqueID(int id);

    boolean existsByUniqueID(int uniqueID);

}
