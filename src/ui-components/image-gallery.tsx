import './image-gallery.css';

interface GalleryProps {
  imageUrls: string[];
}

export function ImageGallery(props: GalleryProps) {
  const { imageUrls } = props;
  if (!imageUrls || imageUrls.length === 0) {
    return <div className="gallery-empty">No images to display.</div>;
  }

  return (
    <div className="image-gallery">
      {imageUrls.map((url, index) => (
        <div key={index} className="gallery-item">
          <img
            src={url}
            alt={`Gallery image ${index + 1}`}
            className="gallery-image"
          />
        </div>
      ))}
    </div>
  );
}
