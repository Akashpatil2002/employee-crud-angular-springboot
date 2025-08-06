package com.tka.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tka.entity.Employee;
import com.tka.service.EmployeeService;

@RestController
public class EmployeeController {
	@Autowired
	private EmployeeService service;

	// Sir Logic
	// @PostMapping("/login")
	// public Employee login(@RequestBody UserLogin userLogin) {
	// return service.login(userLogin.getEmail(), userLogin.getPassword());
	// }

	// @PostMapping("/login")
	// public Employee login(@RequestBody Map<String, String> loginData) {
	// String username = loginData.get("username");
	// String password = loginData.get("password");
	// return service.login(username, password);
	// }

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
		String email = credentials.get("email");
		String password = credentials.get("password");

		Employee employee = service.login(email, password);

		if (employee != null) {
			return ResponseEntity.ok(employee);
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
		}
	}

	@PostMapping("/register")
	public boolean register(@RequestBody Employee employee) {
		service.saveEmployee(employee);
		return true;
	}

	@GetMapping("/findByEmail")
	public Employee findByEmail(@RequestParam String email) {
		return service.findByEmail(email);
	}

	@GetMapping("/getAll")
	public List<Employee> getAll() {
		return service.getAll();
	}

	@GetMapping("/getById")
	public Employee getById(int id) {
		return service.getById(id);
	}

	// @PutMapping("/update/{id}")
	// public boolean update(@RequestBody Employee employee) {
	// service.update(employee);
	// return true;
	// }

	@PutMapping("/update/{id}")
	public boolean update(@PathVariable int id, @RequestBody Employee employee) {
		employee.setId(id); // Important: Ensure ID is set from path
		service.update(employee);
		return true;
	}

	// @DeleteMapping("/delete/{id}")
	// public boolean delete(int id) {
	// return service.delete(id);
	// }

	@DeleteMapping("/delete/{id}")
	public boolean delete(@PathVariable int id) {
		return service.delete(id);
	}

}
