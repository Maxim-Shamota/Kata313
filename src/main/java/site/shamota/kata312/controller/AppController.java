package site.shamota.kata312.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import site.shamota.kata312.entity.Role;
import site.shamota.kata312.entity.User;
import site.shamota.kata312.service.RoleService;
import site.shamota.kata312.service.UserService;

import java.security.Principal;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Controller
public class AppController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AppController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

//    @GetMapping("/")
//    public String welcome() {
//        return "redirect:/admin";
//    }

    @GetMapping("/admin")
    public String findAll(Model model, Principal principal) {
        User user = userService.findByUsername(principal.getName());
        model.addAttribute("user", user);
        model.addAttribute("users", userService.findAll());
        return "admin";
    }

    @GetMapping("admin/addUser")
    public String createUser(Model model) {
        model.addAttribute("user", new User());
        model.addAttribute("roles", roleService.findAll());
        return "addUser";
    }

    @PostMapping("admin/addUser")
    public String createUser(User user,
                             @RequestParam(value = "checkBoxRoles") String[] checkBoxRoles) {
        Set<Role> roleSet = new HashSet<>();
        for (String role : checkBoxRoles) {
            roleSet.add(roleService.findByName(role));
        }
        user.setRoles(roleSet);
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @GetMapping("admin/edit/{id}")
    public String update(Model model, @PathVariable("id") Integer id) {
        model.addAttribute("user", userService.getById(id));
        model.addAttribute("roles", roleService.findAll());
        return "editUser";
    }

    @PostMapping("admin/edit")
    public String update(@ModelAttribute("user") User user) {
        user.setRoles(user.getRoles().stream()
                .map(r -> roleService.findByName(r.getUserRole()))
                .collect(Collectors.toSet()));
        userService.updateUser(user);
        return "redirect:/admin";
    }

    @GetMapping("admin/delete/{id}")
    public String deleteById(@PathVariable("id") Integer id) {
        userService.deleteById(id);
        return "redirect:/admin";
    }

    @GetMapping("/user")
    public String showUserInfo(Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        model.addAttribute("user", userService.findByUsername(auth.getName()));
        return "user";
    }

    @GetMapping("user/{id}")
    public String showUser(Model model, @PathVariable("id") Integer id) {
        model.addAttribute("user", userService.getById(id));
        return "user";
    }

}
