import api from "@shared/api";
import { FileSource } from "@shared/constants/file-source.ts";
import { FileMetadata } from "@shared/types/file-metadata.model.ts";

const uploadFileS3 = (uploadUrl: string, file: File) =>
  fetch(uploadUrl, {
    method: "PUT",
    body: new Blob([file], { type: file.type }),
    headers: {
      "Content-Type": file.type,
      "If-None-Match": "*",
    },
  });

const uploadFileLocal = async (uploadUrl: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post<FileMetadata>(uploadUrl, formData, { headers: { "Content-Type": file.type } });
};

const FileService = {
  uploadFile: async (file: File) => {
    const { uploadUrl, id, source } = await api.post<Omit<FileMetadata, "downloadUrl"> & { uploadUrl: string }>(
      "/api/v1/files",
      {
        fileName: file.name,
        contentType: file.type,
      },
    );

    if (source === FileSource.Local) await uploadFileLocal(uploadUrl, file);
    if (source === FileSource.S3) await uploadFileS3(uploadUrl, file);

    return api.get<FileMetadata>(`/api/v1/files/${id}`);
  },
};

export default FileService;
