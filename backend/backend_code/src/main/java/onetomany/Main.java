//package onetomany;
//
//import java.util.Date;
//
//import onetomany.Matches.MatchesRepository;
//import onetomany.Reports.Reports;
//import onetomany.Reports.ReportsRepository;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.context.annotation.Bean;
//
//
//import onetomany.Users.User;
//import onetomany.Users.UserRepository;
//import onetomany.hobbies.Hobbies;
//import onetomany.hobbies.HobbiesRepository;
//import onetomany.hobbies.HobbyType;
//@SpringBootApplication
//class Main {
//
//    public static void main(String[] args) {
//        SpringApplication.run(Main.class, args);
//    }
//
//    // Create 3 users with their machines and phones
//    @Bean
//    CommandLineRunner initUser(UserRepository userRepository, MatchesRepository matchesRepository, ReportsRepository reportsRepository,HobbiesRepository hobbiesRepository) {
//        return args -> {
//            User user1 = new User("Daniel", "dmvp01@somemail.com", new Date(), "Daniel123");
//            User user2 = new User("Nishi", "Nishi@somemail.com", new Date(),"Nishi456");
//            User user3 = new User("Jayson", "Jayson@somemail.com", new Date(),"Jayson");
//
//
//
//            userRepository.save(user1);
//            userRepository.save(user2);
//            userRepository.save(user3);
//
//
//
//
//
//            reportsRepository.save(new Reports("Bad photo"));
//            reportsRepository.save(new Reports("Weird Bio"));
//            reportsRepository.save(new Reports("Agressive"));
//            reportsRepository.save(new Reports("Rude"));
//            Reports r1 = reportsRepository.findById(1);
//            Reports r2 = reportsRepository.findById(2);
//            Reports r3 = reportsRepository.findById(3);
//            Reports r4= reportsRepository.findById(4);
//
//
//
//
//            r1.setUser(user1);
//            r2.setUser(user1);
//            r3.setUser(user2);
//            r4.setUser(user3);
//
//            reportsRepository.save(r1);
//            reportsRepository.save(r2);
//            reportsRepository.save(r3);
//            reportsRepository.save(r4);
//            user1.addReport(r1);
//            user1.addReport(r2);
//            user2.addReport(r3);
//            user3.addReport(r4);
//
//
//            System.out.println(user1.getReports());
//
//
//
//
//
////            userRepository.save(user1);
////            userRepository.save(user2);
////            userRepository.save(user3);
//        };
//    }
//
//}
//
package onetomany;

import java.util.Date;


import onetomany.Reports.Reports;
import onetomany.Reports.ReportsRepository;


import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;


import onetomany.Users.User;
import onetomany.Users.UserRepository;



@SpringBootApplication
//@EnableSwagger2
class Main {

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Bean
    CommandLineRunner initUser(UserRepository userRepository, ReportsRepository reportsRepository){
        return args -> {
//            User user1= new User("Daniel", "dmvp01@iastate.edu", new Date(), "Daniel123", "DanielNew1", 21);
//            User user2= new User("Nishi", "Nishi@iastate.edu", new Date(), "Nishi456", "NishiNew",22);
//            User user3= new User("Jayson", "jayson@iastate.edu", new Date(), "Jayson123", "newJayson",20);
//            User user4= new User("Chanho", "Chanho12@iastate.edu",new Date(), "Chanho897", "Chanhonew",20);
//
//            userRepository.save(user1);
//            userRepository.save(user2);
//            userRepository.save(user3);
//            userRepository.save(user4);

        };
    }

    // Create 3 users with their machines and phones
//    @Bean
//    CommandLineRunner initUser(UserRepository userRepository, MatchesRepository matchesRepository, ReportsRepository reportsRepository,HobbiesRepository hobbiesRepository) {
//        return args -> {
////
//            User user1 = new User("Daniel", "dmvp01@somemail.com", new Date(), "Daniel123", "danielUser");
//            User user2 = new User("Nishi", "Nishi@somemail.com", new Date(), "Nishi456", "nishiUser");
//            User user3 = new User("Jayson", "Jayson@somemail.com", new Date(), "Jayson789", "jaysonUser");
//
////            Hobbies painting = new Hobbies("Painting", HobbyType.INDOOR);
////            Hobbies football = new Hobbies("Football", HobbyType.OUTDOOR);
////            Hobbies bookClub = new Hobbies("Book Club", HobbyType.GROUP);
////
////            hobbiesRepository.save(painting);
////            hobbiesRepository.save(football);
////            hobbiesRepository.save(bookClub);
////            User updatedUser1 = userRepository.findById(user1.getId());
////            User updatedUser2 = userRepository.findById(user2.getId());
////            User updatedUser3 = userRepository.findById(user3.getId());
////
////
////
////            userRepository.save(user1);
////            userRepository.save(user2);
////            userRepository.save(user3);
//
//
//
//            user1 = userRepository.save(user1);
//            user2 = userRepository.save(user2);
//            user3 = userRepository.save(user3);
//
//            // Create and save hobbies
//            Hobbies painting = hobbiesRepository.save(new Hobbies("Painting", HobbyType.INDOOR));
//            Hobbies football = hobbiesRepository.save(new Hobbies("Football", HobbyType.OUTDOOR));
//            Hobbies bookClub = hobbiesRepository.save(new Hobbies("Book Club", HobbyType.GROUP));
//
//            // Associate hobbies with users
//            user1.getHobbies().add(painting); // Daniel likes Painting
//            user2.getHobbies().add(football); // Nishi likes Football
//            user3.getHobbies().add(bookClub); // Jayson likes Book Club
//
//            // Save the users again to update the relationship
//            userRepository.save(user1);
//            userRepository.save(user2);
//            userRepository.save(user3);
//
//            reportsRepository.save(new Reports("Bad photo"));
//            reportsRepository.save(new Reports("Weird Bio"));
//            reportsRepository.save(new Reports("Agressive"));
//            reportsRepository.save(new Reports("Rude"));
//            Reports r1 = reportsRepository.findById(1);
//            Reports r2 = reportsRepository.findById(2);
//            Reports r3 = reportsRepository.findById(3);
//            Reports r4= reportsRepository.findById(4);
//
//
//
//
//            r1.setUser(user1);
//            r2.setUser(user1);
//            r3.setUser(user2);
//            r4.setUser(user3);
//
//            reportsRepository.save(r1);
//            reportsRepository.save(r2);
//            reportsRepository.save(r3);
//            reportsRepository.save(r4);
//            user1.addReport(r1);
//            user1.addReport(r2);
//            user2.addReport(r3);
//            user3.addReport(r4);
//
//
//            System.out.println(user1.getReports());
//
//
//
//
//
//
////            userRepository.save(user1);
////            userRepository.save(user2);
////            userRepository.save(user3);
//        };
//    }
    @Bean
    public CommandLineRunner demo(UserRepository userRepository) {
        return (args) -> {
            // Create a new user and save it in the database
//            User newUser = new User("Test User", "testuser@example.com", new Date(), "TestUserPassword", "testUsername");
//            userRepository.save(newUser);
//
//            // List all users
//            System.out.println("Users found with findAll():");
//            System.out.println("-------------------------------");
//            for (User user : userRepository.findAll()) {
//                System.out.println(user.getName());
//            }
        };
    }

}

