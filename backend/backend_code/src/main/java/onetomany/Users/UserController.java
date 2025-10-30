package onetomany.Users;

import java.util.List;

import onetomany.roomba.roomba;
import onetomany.roomba.roombaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import onetomany.WebSocketAdminNot.MessageRepository;

import org.springframework.beans.factory.annotation.Autowired;
import onetomany.Reports.ReportsRepository;


import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Vivek Bengre
 *
 */

@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ReportsRepository reportsRepository;


    @Autowired
    roombaRepository roombaRepository1;




    @Autowired
    MessageRepository messageRepository;






    private String success = "{\"message\":\"success\"}";
    private String failure = "{\"message\":\"failure\"}";

    @GetMapping(path = "/users/")
    List<User> getAllUsers(){
        return userRepository.findAll();
    }
    @GetMapping(path = "/users/{id}/")
    User getAUserByID(@PathVariable int id){

        return  userRepository.findById(id);
    }

    @GetMapping(path = "/users/u/{email}/{password}/")
    User getUser (@PathVariable String email, @PathVariable String password){

        User test = userRepository.findByEmailId(email);

        if (test == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        else if( !test.getUserPassword().equals(  password)){

            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password does not match");
        }

      return userRepository.findByEmailId(email);
    }


//    @GetMapping(path = "/loginEmail/{email}/{password}/")
//    User getUserById( @PathVariable String email, @PathVariable String password){
//        User temp= userRepository.findByEmailId(email);
//        if (temp.getUserPassword().equals(password))
//            return temp;
//        return null;
//    }
//    @GetMapping(path = "/us/{username}/{password}/")
//    User getUserByUsername( @PathVariable String username, @PathVariable String password){
//        User temp= userRepository.findByUsername(username);
//        if (temp.getUserPassword().equals(password))
//            return temp;
//        return null;
//    }


    @PostMapping(path = "/users/")
    String createUser(@RequestBody User user ){

        if (user == null ) {

            return failure;
        }
        if(user.getRobotId() == 000000) {
            System.out.println(user.getRobotId() + "0 roomba code");
            return failure;
        }


        roomba tempRobot = roombaRepository1.findByUniqueID(user.getRobotId());
        System.out.println(tempRobot.getId() + "robot id");
        userRepository.save(user);

        User tempUser= userRepository.findByEmailId(user.getEmailId());
        System.out.println(tempUser.getName());
        tempRobot.setUserId(tempUser.getId());
        tempRobot.setHasAssignedUser(true);

        userRepository.save(user);
        roombaRepository1.save(tempRobot);

        return success;
    }


    @PutMapping("/users/{id}/{password}")
    User updateUser(@PathVariable int id, @PathVariable String password, @RequestBody User request){
        User user = userRepository.findById(id);

        if(user == null || !user.getUserPassword().equals(password))
            return null;
        userRepository.save(request);
        return userRepository.findById(id);
    }






    @DeleteMapping(path = "/users/{id}")
    String deleteUser(@PathVariable int id){
        User temp= userRepository.findById(id);


        userRepository.delete(temp);

        return success;
    }



    //test


}

