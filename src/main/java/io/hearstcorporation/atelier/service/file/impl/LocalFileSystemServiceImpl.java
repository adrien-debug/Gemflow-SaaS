package io.hearstcorporation.atelier.service.file.impl;

import io.hearstcorporation.atelier.controller.file.AtelierFileController;
import io.hearstcorporation.atelier.dto.model.file.FileUrlDto;
import io.hearstcorporation.atelier.exception.FileDeleteException;
import io.hearstcorporation.atelier.exception.FileUploadException;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.service.file.LocalFileSystemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

@Slf4j
@Service
@RequiredArgsConstructor
public class LocalFileSystemServiceImpl implements LocalFileSystemService {

    @Override
    public void uploadFile(MultipartFile multipartFile, String fileName, String path) {
        File file = new File(path);
        Path filePath = file.toPath();
        try {
            Files.createDirectories(filePath.getParent());
            Files.copy(multipartFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            String errorMessage = "Error saving the file";
            log.error(errorMessage, e);
            throw new FileUploadException(errorMessage);
        }
    }

    @Override
    public Resource getFileResource(String path) {
        FileSystemResource resource = new FileSystemResource(path);
        if (!resource.exists()) {
            throw new NotFoundException("File content not found");
        }
        return resource;
    }

    @Override
    public void deleteFile(String path) {
        File file = new File(path);
        try {
            Files.deleteIfExists(file.toPath());
        } catch (IOException e) {
            String errorMessage = "Error deleting the file by path '%s'.".formatted(path);
            log.error(errorMessage, e);
            throw new FileDeleteException(errorMessage);
        }
    }

    @Override
    public FileUrlDto generateUploadUrl(String path, String contentType) {
        String url = AtelierFileController.BASE_URL + AtelierFileController.UPLOAD_FILE.replace("{fileId}", path);
        return new FileUrlDto(url, null);
    }

    @Override
    public FileUrlDto generateDownloadUrl(String path, String contentType, boolean cacheable) {
        String url = AtelierFileController.BASE_URL
                + AtelierFileController.DOWNLOAD_FILE.replace("{fileId}", path)
                + "?cacheable=" + cacheable;
        return new FileUrlDto(url, null);
    }
}
