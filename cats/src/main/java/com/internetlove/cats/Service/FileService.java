package com.internetlove.cats.Service;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.internetlove.cats.Entity.FileEntity;
import com.internetlove.cats.Entity.UniversityEntity;
import com.internetlove.cats.Helper.FileUtil;
import com.internetlove.cats.Repository.FileRepository;
import com.internetlove.cats.Repository.UniversityRepository;

@Service
public class FileService {
	@Autowired
	private FileRepository fileRepo;
	@Autowired
	private UniversityRepository uniRepo;
	@Autowired
	UniversityRepository urepo;
	
	public FileEntity uploadImage(MultipartFile file, int uniId) throws IOException {
		UniversityEntity university = new UniversityEntity();
		Date d1 = new Date();
		int int_random = ThreadLocalRandom.current().nextInt(); 
		//yearMONTHdayhourminutes_randomIntegers for file naming
		SimpleDateFormat dateFormHour = new SimpleDateFormat("yyyyMMddhmm_"+int_random);
		
		FileEntity fImage = new FileEntity();
		fImage.setName(dateFormHour.format(d1));
		fImage.setType(file.getContentType());
		fImage.setData(FileUtil.compressImage(file.getBytes()));
		university = uniRepo.findById(uniId).get();
		fImage.setUniversity(university);
		urepo.save(university);
		return fileRepo.save(fImage);
	}
	
	/*public FileEntity uploadImage(MultipartFile file) throws IOException {
		FileEntity fImage = new FileEntity();
		fImage.setName(file.getOriginalFilename());
		fImage.setType(file.getContentType());
		fImage.setData(FileUtil.compressImage(file.getBytes()));
		return fileRepo.save(fImage);
	}*/
	
	public byte[] downloadImage(String fileName) {
		Optional<FileEntity> imageData = fileRepo.findByName(fileName);
		return FileUtil.decompressImage(imageData.get().getData());
	}
	
	public byte[] downloadImageByUniversityId(String id) {
		Optional<FileEntity> imageData = fileRepo.findByUniversityId(id);
		return FileUtil.decompressImage(imageData.get().getData());
	}
}