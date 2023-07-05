package com.internetlove.cats.Controller;

import com.internetlove.cats.Entity.StudentEntity;
import com.internetlove.cats.Entity.UniversityEntity;
import com.internetlove.cats.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    StudentService studentService;

    @GetMapping
    public List<StudentEntity> all(){
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    @ResponseBody
    public StudentEntity one(@PathVariable String id){
        return studentService.getStudentById(id);
    }

    @PostMapping
    public StudentEntity saveStudent(@RequestParam int id, @RequestBody StudentEntity studentEntity) throws Exception {
        return studentService.insertStudent(studentEntity, id);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable int id){
        return studentService.deleteById(id);
    }

    @PutMapping("")
    public StudentEntity update(@RequestParam int id, @RequestBody StudentEntity student) throws Exception{
        return studentService.update(id,student);
    }
}
