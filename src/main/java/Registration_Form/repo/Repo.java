package Registration_Form.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import Registration_Form.dto.User;

public interface Repo extends JpaRepository<User, Long>{

	boolean existsByPhoneNumber(String phoneNumber);
	
	boolean existsByEmail(String email);
	
	void deleteByPhoneNumber(String phoneNumber);
	
	void deleteByEmail(String email);
	
	Optional<User> findByPhoneNumber(String phoneNumber);
	
	Optional<User> findByEmail(String email);

}
