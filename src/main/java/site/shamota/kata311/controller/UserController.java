package site.shamota.kata311.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import site.shamota.kata311.entity.User;
import site.shamota.kata311.service.UserService;

import java.util.List;

@Controller
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping( "/")
    public String welcome() {
        return "redirect:/users";
    }

    @GetMapping( "/users")
    public String findAll(Model model) {
        List<User> users = userService.findAll();
        model.addAttribute("users", users);
        return "users";
    }

    @GetMapping( "/addUser")
    public String createUserForm(User user) {
        return "addUser";
    }

    @PostMapping( "/addUser")
    public String createUser(User user) {
        userService.saveUser(user);
        return "redirect:/users";
    }

    @GetMapping( "users/edit/{id}")
    public String edit(Model model, @PathVariable("id") Integer id) {
        User user = userService.getById(id);
        model.addAttribute("user", user);
        return "editUser";
    }

    @PostMapping( "users/edit")
    public String edit(User user) {
        userService.saveUser(user);
        return "redirect:/users";
    }

    @GetMapping( "users/show/{id}")
    public String showUser(Model model, @PathVariable("id") Integer id) {
        User user = userService.getById(id);
        model.addAttribute("user", user);
        return "show";
    }

    @GetMapping("users/delete/{id}")
    public String deleteById(@PathVariable("id") Integer id) {
        userService.deleteById(id);
        return "redirect:/users";
    }
}
