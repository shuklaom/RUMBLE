package onetomany.Reports;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import onetomany.Users.User;
import onetomany.roomba.roomba;

@Entity
public class Reports {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String report;


    @ManyToOne
    @JsonIgnore
    @JoinColumn
    private roomba roomba1;



    public int getId(){
        return this.id;
    }
    public void setId(int newId){
        this.id=newId;
    }

    public String getReport(){
        return this.report;
    }

    public roomba getRomba(){
        return this.roomba1;
    }

    public Reports(){
    }
    public Reports(String report){
        this.report= report;
    }

    public void setReport(String newReport){
        this.report=newReport;
    }

    public void setRoomba(roomba roomba){
        this.roomba1= roomba;
    }



    public void deleteReport(){
        roomba1 = null;
    }
}
