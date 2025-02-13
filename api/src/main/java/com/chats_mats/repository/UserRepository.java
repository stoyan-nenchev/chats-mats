package com.chats_mats.repository;

import com.chats_mats.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    @Query(value = """
    SELECT * FROM users u
    WHERE :query IS NULL OR
          (u.username ILIKE CONCAT('%', :query, '%')
           OR u.email ILIKE CONCAT('%', :query, '%'))
    """, nativeQuery = true)
    List<User> searchByUsernameOrEmail(@Param("query") String query);

    Optional<User> findByEmail(String email);
}
