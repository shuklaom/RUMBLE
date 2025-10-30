package onetomany.roomba;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.*;
import java.util.List;
import onetomany.Reports.Reports;
import onetomany.Reports.ReportsRepository;
import onetomany.Users.User;
import onetomany.Users.UserRepository;
import java.security.SecureRandom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.stereotype.Service;

/**
 *
 * @author Daniel Pinilla
 *
 */

@RestController
public class roombaController {

    @Autowired
    roombaRepository roombaRepository1;

    private String success = "{\"message\":\"success\"}";
    private String failure = "{\"message\":\"failure\"}";

    @GetMapping(path = "/roomba/")
    List<roomba> getAllUsers(){

        return roombaRepository1.findAll();
    }


    @GetMapping(path = "/roomba/{roombaId}/")
    roomba getUserById( @PathVariable int roombaId){

         roomba temp= roombaRepository1.findById(roombaId);
        if(temp == null )
            return null;

        return temp;
    }
    @GetMapping(path = "/roomba/checkPairing/{uniqueID}/")
    roomba getRoombaByID( @PathVariable int uniqueID){

        roomba temp= roombaRepository1.findByUniqueID(uniqueID);
        if(temp == null || temp.hasAssignedUser )
            return null;

        return temp;
    }


    @PostMapping(path = "/roomba/")
    String createUser(@RequestBody roomba roomba){
        if (roomba == null)
            return failure;
       roomba.setUniqueID(generateUniqueSixDigitId());
        roombaRepository1.save(roomba);
        return success;
    }

    private int generateUniqueSixDigitId() {
        final SecureRandom random = new SecureRandom();
        int retries = 0;
        while (retries < 10) {
            int candidate = 100000 + random.nextInt(900000);
            if (!roombaRepository1.existsByUniqueID(candidate)) {
                return candidate;
            }
            retries++;
        }
        throw new IllegalStateException("Unable to generate unique 6-digit ID after 10 attempts");
    }

    @DeleteMapping(path = "/roomba/{id}")
    String deleteLoginUser( @PathVariable long id){

        roombaRepository1.deleteById(id);
        return success;

    }








}
