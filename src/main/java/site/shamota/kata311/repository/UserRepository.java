package site.shamota.kata311.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.shamota.kata311.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {



}

