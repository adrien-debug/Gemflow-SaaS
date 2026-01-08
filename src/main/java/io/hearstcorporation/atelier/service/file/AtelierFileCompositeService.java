package io.hearstcorporation.atelier.service.file;

import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierFileDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierRequestDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierUploadFileDto;
import io.hearstcorporation.atelier.model.file.AtelierFile;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface AtelierFileCompositeService {

    // Business logic methods

    AtelierUploadFileDto createAtelierFile(AtelierRequestDto atelierRequestDto);

    void uploadLocalAtelierFile(Long atelierFileId, MultipartFile multipartFile);

    void deleteAtelierFile(Long atelierFileId);

    void deleteAtelierFile(AtelierFile atelierFile);

    // Get Dto methods

    AtelierDownloadFileDto getAtelierDownloadFileDto(Long atelierFileId);

    List<AtelierDownloadFileDto> getAtelierDownloadFileDtoList(List<Long> atelierFileIds);

    Map<Long, AtelierDownloadFileDto> getAtelierDownloadFileDtoListMappedById(List<Long> atelierFileIds);

    Pair<AtelierFileDto, Resource> getLocalAtelierFileResource(Long atelierFileId);
}
