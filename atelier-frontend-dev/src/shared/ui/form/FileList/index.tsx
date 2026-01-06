import "./styles.scss";
import { FileMetadata } from "@shared/types/file-metadata.model.ts";
import Button from "antd/es/button";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import Upload from "antd/es/upload";
import { FC, useEffect, useState } from "react";
import useFormInstance from "antd/es/form/hooks/useFormInstance";
import type { UploadFile } from "antd/es/upload/interface";
import FileService from "@shared/services/file.service.ts";
import Form from "antd/es/form";
import { mapFileMetadataListToFileList } from "@shared/ui/form/FileList/utils/file-metadata-list.converter.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import DataDisplay from "@shared/ui/DataDisplay";

interface Props {
  value?: FileMetadata[];
  createFileIdsFieldName?: string;
  deleteFileIdsFieldName?: string;
  editing?: boolean;
  filesMaxCount?: number;
  onStartFileLoad?: () => void;
  onEndFileLoad?: () => void;
}

const DEFAULT_FILES_MAX_COUNT = 10;

const FileList: FC<Props> = ({
  value,
  createFileIdsFieldName,
  deleteFileIdsFieldName,
  editing = true,
  filesMaxCount = DEFAULT_FILES_MAX_COUNT,
  onStartFileLoad,
  onEndFileLoad,
  ...rest
}) => {
  const [internalFileList, setInternalFileList] = useState(mapFileMetadataListToFileList(value));
  const [createFileIds, setCreateFileIds] = useState<number[]>([]);
  const [deleteFileIds, setDeleteFileIds] = useState<number[]>([]);

  const { messageApi } = useMessage();
  const formInstance = useFormInstance();

  useEffect(() => {
    if (value?.length) {
      setInternalFileList(mapFileMetadataListToFileList(value));
    }
  }, [value]);

  useEffect(() => {
    setCreateFileIds(internalFileList.map((f) => f?.response?.id).filter((id) => id));
  }, [internalFileList]);

  useEffect(() => {
    if (createFileIdsFieldName) {
      formInstance.setFieldValue(createFileIdsFieldName, createFileIds);
    }
  }, [createFileIds, createFileIdsFieldName, formInstance]);

  useEffect(() => {
    if (deleteFileIdsFieldName) {
      formInstance.setFieldValue(deleteFileIdsFieldName, deleteFileIds);
    }
  }, [deleteFileIds, deleteFileIdsFieldName, formInstance]);

  const validateFilesCount = (file: UploadFile) => {
    if (internalFileList.length >= filesMaxCount) {
      void messageApi.info(`Max file count is ${filesMaxCount}. ${file.name} won't be uploaded.`);
      return false;
    }
    return true;
  };

  const beforeUpload = async (file: UploadFile) => {
    if (!validateFilesCount(file)) return false;

    onStartFileLoad?.();
    setInternalFileList((prev) => [
      ...prev,
      {
        uid: `${file.uid}`,
        name: file.name,
        status: "uploading",
      },
    ]);

    const uploadedFile = await FileService.uploadFile(file as unknown as File);

    setInternalFileList((prev) =>
      prev.map((f) =>
        f.uid === file.uid
          ? {
              ...f,
              status: "done",
              url: uploadedFile.downloadUrl,
              uid: `${uploadedFile.id}`,
              response: { id: uploadedFile.id },
            }
          : f,
      ),
    );
    onEndFileLoad?.();

    return false;
  };

  const handleRemove = (file: UploadFile) => {
    if (!file?.response?.id) {
      setDeleteFileIds((prev) => [...prev, +file.uid]);
    }
    setInternalFileList((prev) => prev.filter((f) => f.uid !== file.uid));
  };

  return (
    <Upload
      {...rest}
      onChange={() => {}}
      onRemove={handleRemove}
      showUploadList={{
        showRemoveIcon: editing,
      }}
      disabled={!editing}
      fileList={internalFileList}
      beforeUpload={beforeUpload}
      className={`file-list-upload full-width ${!editing ? "view-only" : ""}`}
      maxCount={filesMaxCount}>
      {editing && (
        <Button
          size="large"
          className="full-width"
          icon={<UploadOutlined />}
          disabled={internalFileList.length >= filesMaxCount}>
          Click to Upload
        </Button>
      )}
      {createFileIdsFieldName && ( // Form.Item has to be here to be automatically added to the form values
        <Form.Item name={createFileIdsFieldName} style={{ display: "none" }}>
          <div></div>
        </Form.Item>
      )}
      {deleteFileIdsFieldName && ( // Form.Item has to be here to be automatically added to the form values
        <Form.Item name={deleteFileIdsFieldName} style={{ display: "none" }}>
          <div></div>
        </Form.Item>
      )}
      {!internalFileList?.length && !editing && <DataDisplay>-</DataDisplay>}
    </Upload>
  );
};

export default FileList;
