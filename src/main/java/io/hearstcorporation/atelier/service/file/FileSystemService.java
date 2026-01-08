package io.hearstcorporation.atelier.service.file;

import io.hearstcorporation.atelier.dto.model.file.FileUrlDto;

public interface FileSystemService {

    void deleteFile(String path);

    FileUrlDto generateUploadUrl(String path, String contentType);

    FileUrlDto generateDownloadUrl(String path, String contentType, boolean cacheable);
}
