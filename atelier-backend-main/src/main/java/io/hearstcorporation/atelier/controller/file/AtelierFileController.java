package io.hearstcorporation.atelier.controller.file;

import io.hearstcorporation.atelier.config.file.FileExpirations;
import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierFileDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierRequestDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierUploadFileDto;
import io.hearstcorporation.atelier.service.file.AtelierFileCompositeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.core.io.Resource;
import org.springframework.http.CacheControl;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;

import static io.hearstcorporation.atelier.controller.file.AtelierFileController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class AtelierFileController {

    public static final String BASE_URL = "/api/v1/files";
    public static final String UPLOAD_FILE = "/{fileId}/upload";
    public static final String DOWNLOAD_FILE = "/{fileId}/download";

    private final AtelierFileCompositeService atelierFileCompositeService;

    @PostMapping
    public AtelierUploadFileDto createAtelierFile(@RequestBody @Valid AtelierRequestDto atelierRequestDto) {
        return atelierFileCompositeService.createAtelierFile(atelierRequestDto);
    }

    @GetMapping("/{fileId}")
    public AtelierDownloadFileDto getAtelierFile(@PathVariable Long fileId) {
        return atelierFileCompositeService.getAtelierDownloadFileDto(fileId);
    }

    @PostMapping(UPLOAD_FILE)
    public void uploadAtelierFile(@PathVariable Long fileId, @RequestPart("file") MultipartFile file) {
        atelierFileCompositeService.uploadLocalAtelierFile(fileId, file);
    }

    @GetMapping(DOWNLOAD_FILE)
    public ResponseEntity<Resource> downloadAtelierFile(@PathVariable Long fileId,
                                                        @RequestParam Boolean cacheable) {
        Pair<AtelierFileDto, Resource> atelierFilePair = atelierFileCompositeService.getLocalAtelierFileResource(fileId);
        AtelierFileDto atelierFileDto = atelierFilePair.getLeft();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(atelierFileDto.getContentType()));
        headers.setContentDisposition(ContentDisposition.inline().build());
        CacheControl cacheControl = BooleanUtils.toBoolean(cacheable) ?
                CacheControl.maxAge(Duration.of(
                        FileExpirations.CACHE_CONTROL_VALIDITY_PERIOD_VALUE,
                        FileExpirations.CACHE_CONTROL_VALIDITY_PERIOD_UNIT)) :
                CacheControl.noCache();
        headers.setCacheControl(cacheControl);

        return ResponseEntity.ok()
                .headers(headers)
                .body(atelierFilePair.getRight());
    }
}
