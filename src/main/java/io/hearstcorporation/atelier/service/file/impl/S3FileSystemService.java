package io.hearstcorporation.atelier.service.file.impl;

import io.hearstcorporation.atelier.config.file.FileExpirations;
import io.hearstcorporation.atelier.config.file.property.S3Properties;
import io.hearstcorporation.atelier.dto.model.file.FileUrlDto;
import io.hearstcorporation.atelier.exception.FileDeleteException;
import io.hearstcorporation.atelier.service.file.FileSystemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.CacheControl;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.time.Duration;
import java.time.Instant;

@Slf4j
@Service
@RequiredArgsConstructor
@ConditionalOnProperty(prefix = "file", name = "source", havingValue = "S3")
public class S3FileSystemService implements FileSystemService {

    private final StaticCredentialsProvider staticCredentialsProvider;
    private final S3Properties s3Properties;

    @Override
    public void deleteFile(String path) {
        try (S3Client s3Client = S3Client.builder()
                .region(s3Properties.getRegion())
                .credentialsProvider(staticCredentialsProvider)
                .build()) {

            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(s3Properties.getBucket())
                    .key(path)
                    .build();
            s3Client.deleteObject(deleteObjectRequest);
        } catch (Exception e) {
            String errorMessage = "Error deleting the file by path '%s'.".formatted(path);
            log.error(errorMessage, e);
            throw new FileDeleteException(errorMessage);
        }
    }

    @Override
    public FileUrlDto generateUploadUrl(String path, String contentType) {
        try (S3Presigner s3Presigner = S3Presigner.builder()
                .region(s3Properties.getRegion())
                .credentialsProvider(staticCredentialsProvider)
                .build()) {
            PutObjectRequest objectRequest = PutObjectRequest.builder()
                    .bucket(s3Properties.getBucket())
                    .contentType(contentType)
                    .key(path)
                    .ifNoneMatch("*")
                    .build();

            Duration validityPeriod = Duration.of(
                    FileExpirations.UPLOAD_FILE_VALIDITY_PERIOD_VALUE,
                    FileExpirations.UPLOAD_FILE_VALIDITY_PERIOD_UNIT
            );
            Instant expiredAt = Instant.now().plus(validityPeriod);

            PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
                    .signatureDuration(validityPeriod)
                    .putObjectRequest(objectRequest)
                    .build();

            PresignedPutObjectRequest presignedRequest = s3Presigner.presignPutObject(presignRequest);
            return new FileUrlDto(presignedRequest.url().toExternalForm(), expiredAt);
        }
    }

    @Override
    public FileUrlDto generateDownloadUrl(String path, String contentType, boolean cacheable) {
        try (S3Presigner s3Presigner = S3Presigner.builder()
                .region(s3Properties.getRegion())
                .credentialsProvider(staticCredentialsProvider)
                .build()) {
            CacheControl cacheControl = cacheable ?
                    CacheControl.maxAge(Duration.of(
                            FileExpirations.CACHE_CONTROL_VALIDITY_PERIOD_VALUE,
                            FileExpirations.CACHE_CONTROL_VALIDITY_PERIOD_UNIT)) :
                    CacheControl.noCache();
            GetObjectRequest objectRequest = GetObjectRequest.builder()
                    .bucket(s3Properties.getBucket())
                    .responseCacheControl(cacheControl.getHeaderValue())
                    .responseContentType(contentType)
                    .key(path)
                    .build();

            Duration validityPeriod = Duration.of(
                    FileExpirations.DOWNLOAD_FILE_VALIDITY_PERIOD_VALUE,
                    FileExpirations.DOWNLOAD_FILE_VALIDITY_PERIOD_UNIT
            );
            Instant expiredAt = Instant.now().plus(validityPeriod);

            GetObjectPresignRequest presignRequest = GetObjectPresignRequest.builder()
                    .signatureDuration(validityPeriod)
                    .getObjectRequest(objectRequest)
                    .build();

            PresignedGetObjectRequest presignedRequest = s3Presigner.presignGetObject(presignRequest);
            return new FileUrlDto(presignedRequest.url().toExternalForm(), expiredAt);
        }
    }
}
