import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import NoteForm from '../NoteForm/NoteForm';
import css from './NoteModal.module.css';

interface NoteModalProps {
  onClose: () => void;
}

const NoteModal = ({ onClose }: NoteModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div
      className={css.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={css.modal}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <button type="button" className={css.closeBtn} onClick={onClose}>
          ×
        </button>
        <NoteForm onClose={onClose} />
      </div>
    </div>,
    document.body
  );
};

export default NoteModal;
