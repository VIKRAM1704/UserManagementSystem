package Registration_Form.dao;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import Registration_Form.dto.User;
import Registration_Form.repo.Repo;

@Repository
public class RegisterDao {
	@Autowired
	Repo registerDao;
	
	public User save(User user)
	{
		return registerDao.save(user);
	}
	
	public Optional<User> findByEmail(String email)
	{
		return registerDao.findByEmail(email);
	}
	
	public Optional<User> findByPhoneNumber(String phoneNumber)
	{
		return registerDao.findByPhoneNumber(phoneNumber);
	}
	
	public boolean checkPhoneNumber(String phoneNumber)
	{
		return registerDao.existsByPhoneNumber(phoneNumber);
	}
	
	public boolean checkEmail(String email)
	{
		return registerDao.existsByEmail(email);
	}
	
	public List<User> fetchAll()
	{
		return registerDao.findAll();
	}
	
	public String deleteByPhoneNumber(String phoneNumberOrEmail)
	{
		registerDao.deleteByPhoneNumber(phoneNumberOrEmail);
		return "Data Deleted Sucessfully";
	}
	
	public String deleteByEmail(String phoneNumberOrEmail)
	{
		registerDao.deleteByEmail(phoneNumberOrEmail);
		return "Data Deleted Sucessfully";
	}
	
	public User update(User user,String number)
	{
		user.setPhoneNumber(number);
		return registerDao.save(user);
	}

}
