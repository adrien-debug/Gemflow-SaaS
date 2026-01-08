package io.hearstcorporation.atelier.dto.mapper.file;

import io.hearstcorporation.atelier.dto.model.IdRequestDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierFileDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierUploadFileDto;
import io.hearstcorporation.atelier.model.file.AtelierFile;
import lombok.experimental.UtilityClass;

@UtilityClass
public class AtelierFileMapper {

    public static AtelierUploadFileDto toAtelierUploadFileDto(AtelierFile atelierFile, String uploadUrl) {
        if (atelierFile == null) {
            return null;
        }
        return AtelierUploadFileDto.builder()
                .id(atelierFile.getId())
                .fileName(atelierFile.getFileName())
                .contentType(atelierFile.getContentType())
                .source(atelierFile.getSource())
                .uploadUrl(uploadUrl)
                .build();
    }

    public static AtelierDownloadFileDto toAtelierDownloadFileDto(AtelierFile atelierFile, String downloadUrl,
                                                                  String downloadUrlNoCache) {
        if (atelierFile == null) {
            return null;
        }
        return AtelierDownloadFileDto.builder()
                .id(atelierFile.getId())
                .fileName(atelierFile.getFileName())
                .contentType(atelierFile.getContentType())
                .source(atelierFile.getSource())
                .downloadUrl(downloadUrl)
                .downloadUrlNoCache(downloadUrlNoCache)
                .build();
    }

    public static AtelierFileDto toAtelierFileDto(AtelierFile atelierFile) {
        if (atelierFile == null) {
            return null;
        }
        return AtelierFileDto.builder()
                .id(atelierFile.getId())
                .fileName(atelierFile.getFileName())
                .contentType(atelierFile.getContentType())
                .source(atelierFile.getSource())
                .build();
    }

    public static IdRequestDto toIdRequestDto(AtelierFile atelierFile) {
        return new IdRequestDto(atelierFile.getId());
    }
}
