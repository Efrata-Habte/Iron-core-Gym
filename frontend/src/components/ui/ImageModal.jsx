import { X } from 'lucide-react';
import '../../styles/common.css';

export default function ImageModal({ imageSrc, title, onClose }) {
    if (!imageSrc) return null;

    return (
        <div className="image-modal-overlay" onClick={onClose}>
            <div className="image-modal-content" onClick={e => e.stopPropagation()}>
                <button className="image-modal-close" onClick={onClose}>
                    <X size={24} />
                </button>
                <img src={imageSrc} alt={title || 'Enlarged view'} />
                {title && <h3 className="image-modal-title">{title}</h3>}
            </div>
        </div>
    );
}
