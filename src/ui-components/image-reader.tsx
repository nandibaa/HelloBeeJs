import { type ChangeEvent } from 'react';

export interface ImageReaderProps {
  onFileReadFinished(imageFile: File): void;
}

export default function ImageReader(props: ImageReaderProps) {
  const { onFileReadFinished } = props;

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      onFileReadFinished(file);
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
