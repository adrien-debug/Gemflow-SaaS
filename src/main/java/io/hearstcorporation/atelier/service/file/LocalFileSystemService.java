package io.hearstcorporation.atelier.service.file;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface LocalFileSystemService extends FileSystemService {

    void uploadFile(MultipartFile multipartFile, String fileName, String path);

    Resource getFileResource(String path);
}
