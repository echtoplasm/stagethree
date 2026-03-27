import { useState } from 'react';
import { X } from 'lucide-react';
import { createNewImage, type Image } from '../../../api/images';

export interface ModelCreateProps {
  onSuccess: () => void;
  onClose: () => void;
}

export const ModelCreate = ({ onSuccess, onClose }: ModelCreateProps) => {
  const [imageForm, setImageForm] = useState<Partial<Image>>({
    name: '',
    category: 0,
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !imageForm.name || !imageForm.category) return;
    setLoading(true);
    try {
      await createNewImage(imageForm.name, imageForm.category, file);
      onSuccess();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal">
        <div className="modal-header">
          <div>
            <h2>Upload Model</h2>
            <p className="text-secondary">Add a new 3D model to the library</p>
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
              value={imageForm.name}
              onChange={(e) => setImageForm({ ...imageForm, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="category">Category</label>
            <input
              id="category"
              className="form-input"
              type="number"
              value={imageForm.category}
              onChange={(e) => setImageForm({ ...imageForm, category: Number(e.target.value) })}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="file">File</label>
            <input
              id="file"
              className="form-input"
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
