package com.virtubox.virtubox_assignment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.virtubox.virtubox_assignment.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
