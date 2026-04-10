
import { type Image, deleteImageById } from '../../../api/images';

interface ImageDeleteProps {
  selectedImage: Image
  onClose: () => void;
  onSuccess: () => void;
}


export function ImageDelete({ selectedImage, onClose, onSuccess }: ImageDeleteProps) {

  if (!selectedImage) return null;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await deleteImageById(selectedImage.id);
      onSuccess();
    } catch (err) {
      console.error('caught error:', err);
    }
  }
  return (
    <>
      {/* Backdrop */}
      <div
        className="modal-backdrop"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="modal">
        <div className="modal-header">
          <div>
            <h2>Delete image?</h2>
            <p className="text-danger">Are you sure you want to delete image?</p>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>No, Cancel</button>
          <button className="btn btn-danger btn-sm" onClick={handleSubmit}>Yes, Delete</button>
        </div>
      </div >
    </>
  );
}
