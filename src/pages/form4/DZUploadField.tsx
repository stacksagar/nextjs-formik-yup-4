import React, { useCallback, useEffect } from 'react';
import { useField } from 'formik';
import { useDropzone, FileRejection, FileError } from 'react-dropzone';
import SingleFileUploadWithLoading from './SingleFileUploadWithLoading';
import FileProgress from './FileProgress';
import Upload from 'svgs/Upload';
import { ErrorMessage } from 'formik';
interface UploadableFiles {
  file: File;
  errors: FileError[];
  url?: string;
}

export default function DZUploadField({ name }: { name: string }) {
  const [files, setFiles] = React.useState<UploadableFiles[]>([]);

  const [_, __, helpers] = useField(name);

  useEffect(() => {
    helpers.setValue(files);
  }, [files]);

  const onUpload = (file: File, url: string) => {
    setFiles((curr) =>
      curr.map((fw) => {
        if (fw.file == file) {
          return { ...fw, url };
        }
        return fw;
      })
    );
  };

  const deleteFile = (file: File) => {
    setFiles((curr) => curr.filter((fileWrapper) => fileWrapper.file !== file));
  };

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      const mappedAcc = acceptedFiles.map((file) => ({ file, errors: [] }));
      setFiles((curr) => {
        return [...curr, ...mappedAcc, ...rejectedFiles];
      });
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: 3,
  });

  return (
    <>
      <div
        {...getRootProps()}
        className=" bg-gray-500 rounded p-3 cursor-pointer"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className="flex justify-between items-center">
            <Upload className="w-14 h-14" />
            <p>Drop here....</p>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <Upload className="w-14 h-14" />
            <p>Drag 'n' drop some files here, or click to select files...</p>
          </div>
        )}
      </div>
      <small className="text-red-400">
        <ErrorMessage name="files" />
      </small>
      
      {files.map((fileWrapper, i) =>
        fileWrapper.errors.length ? (
          <FileProgress
            deleteFile={deleteFile}
            file={fileWrapper.file}
            key={i}
            errorMessage={fileWrapper.errors[0].message}
            progress={100}
          />
        ) : (
          <SingleFileUploadWithLoading
            onUpload={onUpload}
            key={i}
            file={fileWrapper.file}
            deleteFile={deleteFile}
          />
        )
      )}
    </>
  );
}
