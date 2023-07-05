package com.internetlove.cats.Service;

import com.internetlove.cats.Entity.StudentEntity;
import com.internetlove.cats.Entity.UniversityEntity;
import com.internetlove.cats.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    StudentRepository studentRepository;
    @Autowired
    UniversityService userv;

    public List<StudentEntity> getAllStudents(){ return studentRepository.findAll(); }

    public StudentEntity getStudentById(String studentId){
        int id = Integer.parseInt(studentId);
        Optional<StudentEntity> result = studentRepository.findById(id);
        StudentEntity student;
        if(result.isPresent()){
            student = result.get();
        }
        else {
            throw new RuntimeException();
        }
        return student;
    }

    public StudentEntity insertStudent(StudentEntity student, int id) throws Exception{
    	try {
    	UniversityEntity uniEntity = userv.getUniversityById(id);
    	//uniEntity.setStudents(student);
    	}catch(NoSuchElementException nex) {
			throw new Exception("ID Number " + id + " does not exist!");
		}
        return studentRepository.save(student);
    }
    
    public StudentEntity update(int id, StudentEntity newStudent) throws Exception {
		StudentEntity student = new StudentEntity();
		try {
			//steps in updating
			//step 1 - search the id number of the student
			student = studentRepository.findById(id).get();
			
			//step 2 - update the record
			student.setFirstName(newStudent.getFirstName());
			student.setMiddleName(newStudent.getMiddleName());
			student.setLastName(newStudent.getLastName());
			student.setEmail(newStudent.getEmail());
			student.setContactNumber(newStudent.getContactNumber());
			
			//Step 3 - save the information and return the value
			return studentRepository.save(student);
		}catch(NoSuchElementException nex) {
			throw new Exception("ID Number " + id + " does not exist!");
		}
	}
    
    public String deleteById(int id) {
		String msg;
		if(studentRepository.findById(id).isEmpty()) {
			msg = "Student deleted";
		}
		else {
			studentRepository.deleteById(id);
			msg = "Student not found or already deleted";
		}
			
		return msg;
	}


}
