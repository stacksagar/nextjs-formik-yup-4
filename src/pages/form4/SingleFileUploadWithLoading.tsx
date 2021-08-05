import { useEffect, useState } from 'react';
import FileProgress from './FileProgress';

interface SingleFileUploadWithLoadingProps {
  file: File;
  deleteFile: (file: File) => void;
  onUpload: (file: File, url: string) => void;
}
export default function SingleFileUploadWithLoading({
  file,
  deleteFile,
  onUpload,
}: SingleFileUploadWithLoadingProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const upload = async () => {
      const url = await FileUpload(file, setProgress);
      onUpload(file, url);
    };

    upload();
  }, []);

  return (
    <FileProgress file={file} progress={progress} deleteFile={deleteFile} />
  );
}

function FileUpload(file, onProgress: (percentage: number) => void) {
  const url = 'https://api.cloudinary.com/v1_1/demo/image/upload';

  return new Promise<string>((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    xhr.onload = () => {
      const resp = JSON.parse(xhr.responseText);
      res(resp.secure_url);
    };

    xhr.onerror = (evt) => rej(evt);

    xhr.upload.onprogress = (evt) => {
      if (evt.lengthComputable) {
        const percentage = (evt.loaded / evt.total) * 100;
        onProgress(Math.round(percentage));
      }
    };

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'docs_upload_example_us_preset');
    xhr.send(formData);
  });
}
