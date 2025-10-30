package onetomany.roomba;

import jakarta.persistence.*;
import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import onetomany.Reports.Reports;
import onetomany.Users.User;

import java.util.List;


@Entity
    @Table(name = "roomba")
    public class roomba {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        int id;


        int posX;

        int posY;

        boolean Full;

        boolean needsCharging;

        boolean backToShop;

        boolean hasAssignedUser;
        boolean InShop;

         int userId;


        @Column(unique = true)
        private int uniqueID;

        @OneToMany(mappedBy = "roomba1")
        List<Reports> roombaReports;


        public roomba(){

        }


        public roomba(int posX, int posY){

            this.posX= posX;
            this.posY= posY;
            this.Full= false;
            this.needsCharging=false;
            this.backToShop=false;
            this.hasAssignedUser = false;
            this.InShop = false;


        }

    public roomba(int posX, int posY, int uniqueID){

        this.posX= posX;
        this.posY= posY;
        this.Full= false;
        this.needsCharging=false;
        this.backToShop=false;
        this.hasAssignedUser = false;
        this.InShop = false;
        this.uniqueID = uniqueID;


    }

    public int getUniqueID() {
        return uniqueID;
    }

    public void setInShop(boolean inShop) {
        InShop = inShop;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public boolean isInShop() {
        return InShop;
    }

    public boolean isHasAssignedUser() {
        return hasAssignedUser;
    }


    public void setHasAssignedUser(boolean hasAssignedUser) {
        this.hasAssignedUser = hasAssignedUser;
    }

    public void setUniqueID(int uniqueID) {
        this.uniqueID = uniqueID;
    }

    public void setBackToShop(boolean backToShop) {
        this.backToShop = backToShop;
    }

    public boolean isBackToShop() {
        return backToShop;
    }

    public boolean isFull() {
        return Full;
    }

    public boolean isNeedsCharging() {
        return needsCharging;
    }

    public int getPosX() {
        return posX;
    }

    public int getPosY() {
        return posY;
    }

    public List<Reports> getRoombaReports() {
        return roombaReports;
    }

    public void setFull(boolean full) {
        Full = full;
    }

    public void setNeedsCharging(boolean needsCharging) {
        this.needsCharging = needsCharging;
    }

    public void setPosX(int posX) {
        this.posX = posX;
    }

    public void setPosY(int posY) {
        this.posY = posY;
    }

    public void setRoombaReports(List<Reports> roombaReports) {
        this.roombaReports = roombaReports;
    }


    public void setId(int id){
            this.id= id;
        }



        public int getId() {
            return id;
        }


        public void addReport(Reports report ){
            this.roombaReports.add(report);
        }
        public void removeReport(Reports byId) {
            this.roombaReports.remove(byId);
        }
    }


