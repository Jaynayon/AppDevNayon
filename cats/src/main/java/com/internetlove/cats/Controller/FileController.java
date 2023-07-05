package com.internetlove.cats.Controller;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.internetlove.cats.Entity.FileEntity;
import com.internetlove.cats.Entity.UniversityEntity;
import com.internetlove.cats.Repository.FileRepository;
import com.internetlove.cats.Service.FileService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
//@RequestMapping("/file")
public class FileController {
	@Autowired
	private FileService fileServ;
	
	@ResponseStatus(value = HttpStatus.OK)
	@PostMapping("/upload")
	public void uploadImage(@RequestParam("data")MultipartFile file,
			@RequestParam("uniId")int uniId) throws IOException{
		fileServ.uploadImage(file,uniId);
	}
	
	@GetMapping("/download/{fileName}")
	public ResponseEntity<byte[]> downloadImage(@PathVariable String fileName) {
		byte[] image = fileServ.downloadImage(fileName);
		return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/jpg")).body(image);
	}
	
	@GetMapping("/download/uid/{university_id}")
	public ResponseEntity<byte[]> downloadImageByUniversity(@PathVariable String university_id) {
		byte[] image = fileServ.downloadImageByUniversityId(university_id);
		return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/jpg")).body(image);
	}
}


