import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

export default function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const current = items[index];

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  if (!current) return null;

  const isImage = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(current.file || current.src || '');
  const isPDF = /\.pdf$/i.test(current.file || current.src || '');
  const src = current.file || current.src;

  return (
    <div
      className="fixed inset-0 z-[9000] flex items-center justify-center"
      style={{ background: 'rgba(5, 5, 15, 0.97)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={current.title || 'Preview'}
    >
      {/* Stop propagation on inner */}
      <div
        className="relative w-full max-w-4xl mx-4 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between w-full mb-4 px-2">
          <div>
            <p className="text-white font-display font-semibold text-lg">{current.title}</p>
            {current.issuer && <p className="text-slate-400 text-sm">{current.issuer} · {current.date}</p>}
          </div>
          <div className="flex gap-2">
            {src && (
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-accent-600/30 hover:bg-accent-600/60 text-white transition-colors"
                title="Open in new tab"
              >
                <ExternalLink size={18} />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="w-full rounded-2xl overflow-hidden bg-surface-800 border border-white/10" style={{ maxHeight: '70vh' }}>
          {isImage && (
            <img
              src={src}
              alt={current.title}
              className="w-full h-full object-contain"
              style={{ maxHeight: '70vh' }}
            />
          )}
          {isPDF && (
            <iframe
              src={src}
              title={current.title}
              className="w-full"
              style={{ height: '70vh' }}
            />
          )}
          {!isImage && !isPDF && (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
              <p className="mb-4">Preview not available</p>
              {src && (
                <a href={src} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Open File
                </a>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        {items.length > 1 && (
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={onPrev}
              className="p-3 rounded-full bg-accent-600/30 hover:bg-accent-600/60 text-white transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-slate-400 text-sm font-mono">
              {index + 1} / {items.length}
            </span>
            <button
              onClick={onNext}
              className="p-3 rounded-full bg-accent-600/30 hover:bg-accent-600/60 text-white transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
