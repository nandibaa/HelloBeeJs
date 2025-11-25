import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { BeeWrapper } from './component/bee-wrapper';
import ImageReader from './ui-components/image-reader';
import type { ImageFile } from './ui-components/types';
import viteLogo from '/solarpunk.jpg';
import { ImageGallery } from './ui-components/image-gallery';
import { TabName } from './util';
import { readUrls } from './component/url-storage';

function App() {
  const [file, setFile] = useState<ImageFile | null>(null);
  const [selectedTab, setSelectedTab] = useState(TabName.Upload);

  const [uploading, setUploading] = useState(false);

  const bee = useMemo(() => new BeeWrapper(), []);

  function onFileReadFinished(imageFile: ImageFile) {
    setFile(imageFile);
  }

  function upload() {
    setUploading(true);
  }

  useEffect(() => {
    async function doUpload() {
      if (file) {
        await bee.upload(file);
      }
      setUploading(false);
      setFile(null);
    }

    if (uploading) {
      doUpload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploading]);

  function renderContent() {
    switch (selectedTab) {
      case TabName.Upload: {
        return (
          <>
            <h1>Select a file to upload</h1>
            <div className="upload">
              <ImageReader onFileReadFinished={onFileReadFinished} />
              <button disabled={uploading} onClick={upload}>
                Upload
              </button>
            </div>
          </>
        );
      }
      case TabName.Gallery: {
        return (
          <div className="gallery">
            <ImageGallery imageUrls={readUrls()} />
          </div>
        );
      }
    }
  }

  return (
    <div className="body">
      <img src={viteLogo} className="logo" alt="Vite logo" />
      <div className="tabs">
        <span className="tab" onClick={() => setSelectedTab(TabName.Upload)}>
          Upload
        </span>
        <span className="tab" onClick={() => setSelectedTab(TabName.Gallery)}>
          Gallery
        </span>
      </div>

      {renderContent()}
    </div>
  );
}

export default App;
