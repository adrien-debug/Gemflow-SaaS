package io.hearstcorporation.atelier.service.file.impl;

import io.hearstcorporation.atelier.config.file.property.FileProperties;
import io.hearstcorporation.atelier.dto.mapper.file.AtelierFileMapper;
import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierFileDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierRequestDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierUploadFileDto;
import io.hearstcorporation.atelier.dto.model.file.FileUrlDto;
import io.hearstcorporation.atelier.model.file.AtelierFile;
import io.hearstcorporation.atelier.model.file.Source;
import io.hearstcorporation.atelier.service.file.AtelierFileCompositeService;
import io.hearstcorporation.atelier.service.file.AtelierFileService;
import io.hearstcorporation.atelier.service.file.FileSystemService;
import io.hearstcorporation.atelier.service.file.LocalFileSystemService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AtelierFileCompositeServiceImpl implements AtelierFileCompositeService {

    private final FileProperties fileProperties;
    private final AtelierFileService atelierFileService;
    private final LocalFileSystemService localFileSystemService;
    private final FileSystemService s3FileSystemService;

    @Override
    @Transactional
    public AtelierUploadFileDto createAtelierFile(AtelierRequestDto atelierRequestDto) {
        AtelierFile atelierFile = atelierFileService.createAtelierFile(atelierRequestDto, fileProperties.getSource());
        return AtelierFileMapper.toAtelierUploadFileDto(atelierFile, generateUploadUrl(atelierFile).url());
    }

    @Override
    public void uploadLocalAtelierFile(Long atelierFileId, MultipartFile multipartFile) {
        AtelierFile atelierFile = atelierFileService.getAtelierFile(atelierFileId);
        if (atelierFile.getSource() != Source.LOCAL) {
            throw new IllegalStateException("Source is not a local file");
        }
        localFileSystemService.uploadFile(multipartFile, atelierFile.getInternalFileName(), atelierFile.getPath());
    }

    @Override
    @Transactional
    public void deleteAtelierFile(Long atelierFileId) {
        AtelierFile atelierFile = atelierFileService.getAtelierFile(atelierFileId);
        atelierFileService.deleteAtelierFile(atelierFileId);
        deleteAtelierFileContent(atelierFile);
    }

    @Override
    @Transactional
    public void deleteAtelierFile(AtelierFile atelierFile) {
        atelierFileService.deleteAtelierFile(atelierFile);
        deleteAtelierFileContent(atelierFile);
    }

    @Override
    @Transactional
    public AtelierDownloadFileDto getAtelierDownloadFileDto(Long atelierFileId) {
        AtelierFile atelierFile = atelierFileService.getAtelierFile(atelierFileId);
        return toAtelierDownloadFileDto(atelierFile);
    }

    @Override
    @Transactional
    public List<AtelierDownloadFileDto> getAtelierDownloadFileDtoList(List<Long> atelierFileIds) {
        return atelierFileService.getAtelierFiles(atelierFileIds).stream()
                .map(this::toAtelierDownloadFileDto)
                .toList();
    }

    @Override
    @Transactional
    public Map<Long, AtelierDownloadFileDto> getAtelierDownloadFileDtoListMappedById(List<Long> atelierFileIds) {
        return atelierFileService.getAtelierFiles(atelierFileIds).stream()
                .map(this::toAtelierDownloadFileDto)
                .collect(Collectors.toMap(AtelierDownloadFileDto::getId, Function.identity()));
    }

    private AtelierDownloadFileDto toAtelierDownloadFileDto(AtelierFile atelierFile) {
        return AtelierFileMapper.toAtelierDownloadFileDto(atelierFile,
                getOrGenerateDownloadUrl(atelierFile),
                generateDownloadNoCacheUrl(atelierFile));
    }

    @Override
    public Pair<AtelierFileDto, Resource> getLocalAtelierFileResource(Long atelierFileId) {
        AtelierFile atelierFile = atelierFileService.getAtelierFile(atelierFileId);
        if (atelierFile.getSource() != Source.LOCAL) {
            throw new IllegalStateException("Source is not a local file");
        }
        return Pair.of(
                AtelierFileMapper.toAtelierFileDto(atelierFile),
                localFileSystemService.getFileResource(atelierFile.getPath()));
    }

    private FileUrlDto generateUploadUrl(AtelierFile atelierFile) {
        return switch (atelierFile.getSource()) {
            case LOCAL -> localFileSystemService.generateUploadUrl(atelierFile.getId().toString(),
                    atelierFile.getContentType());
            case S3 -> s3FileSystemService.generateUploadUrl(atelierFile.getPath(), atelierFile.getContentType());
        };
    }

    private String getOrGenerateDownloadUrl(AtelierFile atelierFile) {
        Instant urlExpiredAt = atelierFile.getDownloadUrlExpiredAt();
        if (urlExpiredAt != null && urlExpiredAt.isBefore(Instant.now()) || atelierFile.getDownloadUrl() == null) {
            FileUrlDto fileUrlDto = generateDownloadUrl(atelierFile, true);
            atelierFileService.updateDownloadUrl(atelierFile, fileUrlDto);
            return fileUrlDto.url();
        }
        return atelierFile.getDownloadUrl();
    }

    private String generateDownloadNoCacheUrl(AtelierFile atelierFile) {
        return generateDownloadUrl(atelierFile, false).url();
    }

    private FileUrlDto generateDownloadUrl(AtelierFile atelierFile, boolean cacheable) {
        return switch (atelierFile.getSource()) {
            case LOCAL -> localFileSystemService.generateDownloadUrl(atelierFile.getId().toString(),
                    atelierFile.getContentType(), cacheable);
            case S3 -> s3FileSystemService.generateDownloadUrl(atelierFile.getPath(),
                    atelierFile.getContentType(), cacheable);
        };
    }

    private void deleteAtelierFileContent(AtelierFile atelierFile) {
        switch (atelierFile.getSource()) {
            case LOCAL -> localFileSystemService.deleteFile(atelierFile.getPath());
            case S3 -> s3FileSystemService.deleteFile(atelierFile.getPath());
        }
    }
}
