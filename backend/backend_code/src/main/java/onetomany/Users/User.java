
package onetomany.Users;

import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;



import onetomany.Reports.Reports;



@Entity
@Table(name="Users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String emailId;
    private String userPassword;


    private String username;

    @Column(unique = true)
    private int robotId;


    // =============================== Constructors ================================== //


    public User(String name, String emailId, String userPassword,String username, int robotId ) {
        this.name = name;
        this.emailId = emailId;


        this.userPassword= userPassword;

        this.username = username;

        this.robotId = robotId;
    }

    public User() {
    }



    public void setRobotId(int robotId) {
        this.robotId = robotId;
    }

    public int getRobotId() {
        return robotId;
    }

    public int getId(){
        return id;
    }

    public void setId(int id){
        this.id = id;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmailId(){
        return emailId;
    }

    public void setEmailId(String emailId){
        this.emailId = emailId;
    }



    public String getUserPassword(){
        return this.userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }


    public User getUser(User user){
        User temp = new User();
        return temp;
    }


}
