import { type ChangeEvent } from 'react';
import type { ImageFile } from './types';

export interface ImageReaderProps {
  onFileReadFinished(imageFile: ImageFile): void;
}

export default function ImageReader(props: ImageReaderProps) {
  const { onFileReadFinished } = props;

  function handleUploadFinish(e: ProgressEvent<FileReader>, fileName: string) {
    const target = e.target?.result;

    if (!target) {
      return;
    }
    if (typeof target === 'string') {
      onFileReadFinished({ fileName, base64Content: target });
    } else {
      const base64Content = new TextDecoder('UTF-8').decode(target);
      onFileReadFinished({ fileName, base64Content });
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => handleUploadFinish(e, file.name);
      fileReader.readAsText(file);
    }
  }

  return (
    <div>
      <input
        id="fileInput"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleFileChange}
      />
    </div>
  );
}
