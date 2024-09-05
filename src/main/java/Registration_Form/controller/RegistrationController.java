package Registration_Form.controller;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import Registration_Form.dto.CheckNumberResponse;
import Registration_Form.dto.User;
import Registration_Form.repo.Repo;

@RestController
@RequestMapping("/api")
public class RegistrationController {

    @Autowired
    private Repo userRepository;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
      
        return userRepository.save(user);
    }
    
    @GetMapping("/getByPhoneNumberOrEmail/{phoneNumberOrEmail}")
    public ResponseEntity<User> fetchByPhoneNumberOrEmail(@PathVariable String phoneNumberOrEmail) {
        Optional<User> user;

        if (phoneNumberOrEmail.contains("@")) {
            user = userRepository.findByEmail(phoneNumberOrEmail);
        } else {
            user = userRepository.findByPhoneNumber(phoneNumberOrEmail);
        }

        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

   
    @GetMapping("/check-number")
    public ResponseEntity<CheckNumberResponse> checkNumber(@RequestParam String phoneNumber) {
        boolean exists = userRepository.existsByPhoneNumber(phoneNumber);
        return ResponseEntity.ok(new CheckNumberResponse(exists));
    }
    
    @GetMapping("/check-email")
    public ResponseEntity<CheckNumberResponse> checkEmail(@RequestParam String email) {
        boolean exists = userRepository.existsByEmail(email);
        return ResponseEntity.ok(new CheckNumberResponse(exists));
    }
    
    @GetMapping("/getAll")
    public List<User> fetchAll() {
        return userRepository.findAll();
    }
    
    @DeleteMapping("/deleteByNumber/{phoneNumberOrEmail}")
    @Transactional
    public ResponseEntity<User> deleteByPhoneNumber(@PathVariable String phoneNumberOrEmail) {        
        Optional<User> user;
        if (phoneNumberOrEmail.contains("@")) 
        {
        	 user = userRepository.findByEmail(phoneNumberOrEmail);
             if(user.isPresent())
             {
            	 userRepository.deleteByEmail(phoneNumberOrEmail);
                 return ResponseEntity.ok().build();
             }
        } 
        if(!phoneNumberOrEmail.contains("@")) 
        {
            user = userRepository.findByPhoneNumber(phoneNumberOrEmail);
            if(user.isPresent())
            {
            	userRepository.deleteByPhoneNumber(phoneNumberOrEmail);
                return ResponseEntity.ok().build();
            }
        }
		return ResponseEntity.notFound().build();
    }

    
    @PutMapping("/update/{phoneNumberOrEmail}")
    public ResponseEntity<User> update(@PathVariable String phoneNumberOrEmail, @RequestBody User user) {
    	Optional<User> existingUserOpt;
        if (phoneNumberOrEmail.contains("@")) 
        {
        	existingUserOpt = userRepository.findByEmail(phoneNumberOrEmail);
            if(existingUserOpt.isPresent())
            {
            	User existingUser = existingUserOpt.get();
                existingUser.setName(user.getName());
                existingUser.setDob(user.getDob());
                existingUser.setGender(user.getGender());
                existingUser.setCourse(user.getCourse());
                existingUser.setLanguage(user.getLanguage());
                
                User updatedUser = userRepository.save(existingUser);
                return ResponseEntity.ok(updatedUser);
            }
        } 
        if(!phoneNumberOrEmail.contains("@")) 
        {
        	existingUserOpt = userRepository.findByPhoneNumber(phoneNumberOrEmail);
            if(existingUserOpt.isPresent())
            {
            	User existingUser = existingUserOpt.get();
                existingUser.setName(user.getName());
                existingUser.setDob(user.getDob());
                existingUser.setGender(user.getGender());
                existingUser.setCourse(user.getCourse());
                existingUser.setLanguage(user.getLanguage());
                
                User updatedUser = userRepository.save(existingUser);
                return ResponseEntity.ok(updatedUser);
            }
        }	
     return ResponseEntity.notFound().build();
    }
    
}
