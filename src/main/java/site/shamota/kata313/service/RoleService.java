package site.shamota.kata313.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.shamota.kata313.entity.Role;
import site.shamota.kata313.repository.RoleRepository;

import java.util.List;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public List<Role> findAll() {
        return roleRepository.findAll();
    }

    public Role findByName(String userRole) {
        return roleRepository.findByUserRole(userRole);
    }

    public Role findById(Integer id) {
        return roleRepository.findById(id).orElse(null);
    }

    public void addRole(Role role) {
        roleRepository.save(role);
    }

}
