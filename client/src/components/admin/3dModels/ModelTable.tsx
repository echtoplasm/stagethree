import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash } from 'lucide-react'
import { fetchAllImages, type Image } from '../../../api/images';
import { ImageDataUpdate } from './ModelUpdate';
import { ImageDelete } from './ModelDelete';
import { ModelCreate } from './ModelCreate';
import { ErrorMessage } from '../../../components/userUI/ErrorMessage';

export const ImageTable = () => {
  //state management
  const [images, setImages] = useState<Image[]>([]);
  const [imageCreate, setImageCreate] = useState(false)
  const [imageUpdate, setImageUpdate] = useState(false);
  const [imageDelete, setImageDelete] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const data = await fetchAllImages();
      setImages(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch images');
    } finally {
      setLoading(false);
    }
  };




  useEffect(() => {
    fetchImages();
  }, [])

  if (loading && images.length === 0) {
    return (
      <div className="flex-center">
        <div className="text-center">
          <div className="spinner" style={{ width: '48px', height: '48px', margin: '0 auto 1rem' }} />
          <p className="text-secondary">Loading images</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage error={error} />
  }


  return (

    <div>
      <div className="content-wrapper">
        <header className="admin-header mb-8">
          <div>
            <h1>images Management</h1>
            <p className="text-secondary">Manage all registered images</p>
          </div>
          {error && (
            <ErrorMessage error={error} />
          )}
          <button className="btn btn-primary" onClick={() => setImageCreate(true)}>
            <Plus size={18} />
            Create New image
          </button>
        </header>

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Image name</th>
                <th>R2 path</th>
                <th>File Type</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {images.map((image) => (
                <tr key={image.id}>
                  <td>{image.name}</td>
                  <td title='{image.filepath}'>{image.filePath.split('/').pop()}</td>
                  <td>{image.fileType}</td>
                  <td>{image.category}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-sm btn-ghost"
                      onClick={() => {
                        setSelectedImage(image)
                        setImageUpdate(true)
                      }
                      }>
                      <Pencil size={16} />
                    </button>
                    <button className="btn btn-sm btn-danger"
                      onClick={() => {
                        setSelectedImage(image)
                        setImageDelete(true)
                      }}>
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {imageUpdate && selectedImage && (
        <ImageDataUpdate
          onSuccess={() => {
            fetchImages();
            setImageUpdate(false);
          }}
          onClose={() => {
            setImageUpdate(false);
          }}
          selectedImage={selectedImage}
        />
      )}

      {imageDelete && selectedImage && (
        <ImageDelete
          selectedImage={selectedImage}
          onClose={() => {
            setImageDelete(false);
            setSelectedImage(null);
            fetchImages();
          }}

          onSuccess={() => {
            setImageDelete(false);
            setSelectedImage(null);
            fetchImages();
          }}
        />
      )}

      {imageCreate && (
        <ModelCreate
          onSuccess={() => {
            setImageCreate(false);
            fetchImages();
          }}
          onClose={() => {
            setImageCreate(false);
            fetchImages();
          }}
        />
      )}

    </div>

  )
}
