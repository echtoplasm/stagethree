import { useState } from 'react';
import { X } from 'lucide-react';
import { type Image, updateImageById } from '../../../api/images';

export interface ImageDataUpdateProps {
  onClose: () => void;
  onSuccess: (data: Image) => void;
  selectedImage: Image;
}

export const ImageDataUpdate = ({ onClose, onSuccess, selectedImage }: ImageDataUpdateProps) => {
  const [imageDataForm, setImageDataForm] = useState<Image>({
    id: selectedImage.id,
    name: selectedImage.name,
    category: selectedImage.category,
    filePath: selectedImage.filePath,
    fileType: selectedImage.fileType,
    createdAt: selectedImage.createdAt,
    defaultScaleX: selectedImage.defaultScaleX,
    defaultScaleY: selectedImage.defaultScaleY,
    defaultScaleZ: selectedImage.defaultScaleZ
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateImageById(selectedImage.id, imageDataForm)
    onSuccess(imageDataForm);
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal">
        <div className="modal-header">
          <div>
            <h2>Update Image</h2>
            <p className="text-secondary">Edit the image information</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label className="form-label" htmlFor="name">Name</label>
            <input
              id="name"
              className="form-input"
              type="text"
              value={imageDataForm.name}
              onChange={(e) => setImageDataForm({ ...imageDataForm, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="category">Category</label>
            <input
              id="category"
              className="form-input"
              type="text"
              value={imageDataForm.category}
              onChange={(e) => setImageDataForm({ ...imageDataForm, category: parseInt(e.target.value) })}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="fileType">File Type</label>
            <input
              id="fileType"
              className="form-input"
              type="text"
              value={imageDataForm.fileType}
              onChange={(e) => setImageDataForm({ ...imageDataForm, fileType: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="fileType">Model Scale X-axis</label>
            <input
              id="defaultScaleX"
              className="form-input"
              type="number"
              value={imageDataForm.defaultScaleX}
              onChange={(e) => setImageDataForm({ ...imageDataForm, defaultScaleX: parseFloat(e.target.value) })}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="fileType">Model Scale Y-axis</label>
            <input
              id="defaultScaleY"
              className="form-input"
              type="number"
              value={imageDataForm.defaultScaleY}
              onChange={(e) => setImageDataForm({ ...imageDataForm, defaultScaleY: parseFloat(e.target.value) })}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="fileType">Model Scale Z-axis</label>
            <input
              id="defaultScaleZ"
              className="form-input"
              type="number"
              value={imageDataForm.defaultScaleZ}
              onChange={(e) => setImageDataForm({ ...imageDataForm, defaultScaleZ: parseFloat(e.target.value) })}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
