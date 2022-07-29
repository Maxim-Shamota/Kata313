package site.shamota.kata313.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.shamota.kata313.entity.User;
import site.shamota.kata313.service.RoleService;
import site.shamota.kata313.service.UserService;

import java.util.List;

@org.springframework.web.bind.annotation.RestController
@RequestMapping()
public class RestController {

    UserService userService;
    RoleService roleService;

    @Autowired
    public RestController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping()
    public ResponseEntity<List<User>> showAllUsers() {
        List<User> userList = userService.findAll();
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        userService.saveUser(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<User> showUserById(@PathVariable("id") int id) {
        User user = userService.getById(id);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") int id, @RequestBody User userDetails) {
        User user = userService.getById(id);
        user.setId(userDetails.getId());
        user.setUsername(userDetails.getUsername());
        user.setSurname(userDetails.getSurname());
        user.setAge(userDetails.getAge());
        user.setPassword(userDetails.getPassword());
        user.setRoles(userDetails.getRoles());
        userService.saveUser(user);
        return ResponseEntity.ok().body(user);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        userService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
