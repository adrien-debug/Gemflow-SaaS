package io.hearstcorporation.atelier.service.file.impl;

import io.hearstcorporation.atelier.config.organization.property.OrganizationProperties;
import io.hearstcorporation.atelier.dto.model.file.AtelierRequestDto;
import io.hearstcorporation.atelier.dto.model.file.FileUrlDto;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.file.AtelierFile;
import io.hearstcorporation.atelier.model.file.Source;
import io.hearstcorporation.atelier.repository.file.AtelierFileRepository;
import io.hearstcorporation.atelier.service.file.AtelierFileService;
import io.hearstcorporation.atelier.util.ExceptionWrapper;
import io.hearstcorporation.atelier.util.ServiceHelper;
import lombok.RequiredArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AtelierFileServiceImpl implements AtelierFileService {

    private static final String SLASH = "/";
    private static final String STORAGE_ROOT_PATH = "atelier/storage";
    private static final String PATH_TEMPLATE = STORAGE_ROOT_PATH + "/%s/%s";
    private static final String FILE_NAME_TEMPLATE = "%s-%s";
    private static final DateTimeFormatter FILE_NAME_DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("dd.MM.yyyy_HH:mm:ss.nnnnnnnnn")
            .withZone(ZoneId.systemDefault());

    private final OrganizationProperties organizationProperties;
    private final AtelierFileRepository atelierFileRepository;

    @Override
    @Transactional
    public AtelierFile createAtelierFile(AtelierRequestDto atelierRequestDto, Source source) {
        AtelierFile atelierFile = new AtelierFile();
        atelierFile.setSource(source);
        atelierFile.setFileName(atelierRequestDto.getFileName());
        atelierFile.setInternalFileName(generateInternalFileName(atelierRequestDto.getFileName()));
        atelierFile.setPath(generatePath(atelierFile.getInternalFileName(), source));
        atelierFile.setContentType(atelierRequestDto.getContentType());
        atelierFile = atelierFileRepository.save(atelierFile);
        return atelierFile;
    }

    private String generateInternalFileName(String originalFileName) {
        return FILE_NAME_TEMPLATE.formatted(FILE_NAME_DATE_TIME_FORMATTER.format(Instant.now()), originalFileName);
    }

    private String generatePath(String internalFileName, Source source) {
        String path = PATH_TEMPLATE.formatted(organizationProperties.getName(), internalFileName);
        if (source == Source.LOCAL) {
            return SLASH + path;
        }
        return path;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void updateDownloadUrl(AtelierFile atelierFile, FileUrlDto fileUrlDto) {
        atelierFile.setDownloadUrl(fileUrlDto.url());
        atelierFile.setDownloadUrlExpiredAt(fileUrlDto.expiredAt());
        atelierFileRepository.save(atelierFile);
    }

    @Override
    @Transactional
    public void deleteAtelierFile(Long id) {
        AtelierFile atelierFile = getAtelierFile(id);
        deleteAtelierFile(atelierFile);
    }

    @Override
    @Transactional
    public void deleteAtelierFile(AtelierFile atelierFile) {
        ExceptionWrapper.onDelete(() -> atelierFileRepository.deleteById(atelierFile.getId()),
                "Atelier file with id %d cannot be deleted.".formatted(atelierFile.getId()));
    }

    @Override
    public AtelierFile getAtelierFile(Long id) {
        return atelierFileRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Atelier file with id %d was not found.".formatted(id))
        );
    }

    @Override
    public List<AtelierFile> getAtelierFiles(List<Long> ids) {
        if (CollectionUtils.isEmpty(ids)) {
            return new ArrayList<>();
        }
        List<AtelierFile> files = atelierFileRepository.findAllByIdInOrderByIdAsc(ids);
        ServiceHelper.compareIdsOrThrow(files, ids, AtelierFile.class);
        return files;
    }

    @Override
    public Map<Long, AtelierFile> getAtelierFilesMappedById(List<Long> ids) {
        return getAtelierFiles(ids).stream().collect(Collectors.toMap(AtelierFile::getId, Function.identity()));
    }

    @Override
    public Page<AtelierFile> getUnusedAtelierFiles(Instant createdBefore, Pageable pageable) {
        return atelierFileRepository.findUnusedAndCreatedBefore(createdBefore, pageable);
    }
}
