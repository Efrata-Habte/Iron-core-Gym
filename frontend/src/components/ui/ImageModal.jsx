import { X, Download } from 'lucide-react';
import '../../styles/common.css';

export default function ImageModal({ imageSrc, title, uploaderName, onDownload, onClose }) {
    if (!imageSrc) return null;

    return (
        <div className="image-modal-overlay" onClick={onClose}>
            <div className="image-modal-content" onClick={e => e.stopPropagation()}>
                <button className="image-modal-close" onClick={onClose}>
                    <X size={24} />
                </button>
                <img src={imageSrc} alt={title || 'Enlarged view'} />
                <div className="image-modal-metadata">
                    <div className="image-modal-info">
                        {uploaderName && <span className="image-modal-uploader">{uploaderName}</span>}
                        {title && title.trim() !== "" && <h3 className="image-modal-title">{title}</h3>}
                    </div>
                    {onDownload && (
                        <button className="image-modal-download" onClick={onDownload} title="Download Image">
                            <Download size={24} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
