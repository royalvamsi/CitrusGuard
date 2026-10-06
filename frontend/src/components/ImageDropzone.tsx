import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, Image as ImageIcon, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageDropzoneProps {
  onImageSelected: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
  disabled?: boolean;
  externalPreviewUrl?: string | null;
}

const MAX_SIZE_MB = 10;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  onImageSelected,
  selectedFile,
  onClear,
  disabled = false,
  externalPreviewUrl = null,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [internalPreviewUrl, setInternalPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (externalPreviewUrl) {
      setInternalPreviewUrl(externalPreviewUrl);
    }
  }, [externalPreviewUrl]);

  const validateAndProcessFile = (file: File) => {
    setErrorMessage(null);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setErrorMessage(`Invalid format (${file.type || 'unknown'}). Please upload JPEG, PNG, or WebP.`);
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setErrorMessage(`File is too large (${(file.size / (1024 * 1024)).toFixed(1)} MB). Limit is ${MAX_SIZE_MB} MB.`);
      return;
    }

    const url = URL.createObjectURL(file);
    setInternalPreviewUrl(url);
    onImageSelected(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const handleClear = () => {
    if (internalPreviewUrl && !externalPreviewUrl) {
      URL.revokeObjectURL(internalPreviewUrl);
    }
    setInternalPreviewUrl(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClear();
  };

  const displayPreview = externalPreviewUrl || internalPreviewUrl;

  return (
    <div className="w-full text-left">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileInputChange}
        disabled={disabled}
      />

      <AnimatePresence mode="wait">
        {selectedFile && displayPreview ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="relative rounded-3xl overflow-hidden border border-[#DDE6D8] bg-white shadow-xs group"
          >
            <div className="relative aspect-[4/3] sm:aspect-[16/10] max-h-[380px] w-full bg-[#EEF2EC] flex items-center justify-center overflow-hidden">
              <img
                src={displayPreview}
                alt="Selected specimen"
                className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>

            <div className="p-4 flex items-center justify-between bg-white border-t border-[#DDE6D8]">
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-[#EEF2EC] border border-[#DDE6D8] flex items-center justify-center text-[#24361B] shrink-0">
                  <ImageIcon className="w-5 h-5 text-[#98CC6B]" />
                </div>
                <div className="truncate">
                  <p className="text-sm font-bold text-[#24361B] truncate">{selectedFile.name}</p>
                  <p className="text-xs text-[#5D6B55] font-mono">
                    {(selectedFile.size / 1024).toFixed(1)} KB &bull; {selectedFile.type.replace('image/', '').toUpperCase() || 'JPEG'}
                  </p>
                </div>
              </div>

              {!disabled && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-2 rounded-xl bg-[#EEF2EC] hover:bg-[#ED7A3B]/10 text-[#5D6B55] hover:text-[#ED7A3B] border border-[#DDE6D8] transition-colors cursor-pointer"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !disabled && fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 relative ${
              isDragOver
                ? 'border-[#98CC6B] bg-[#EEF2EC] scale-[1.01]'
                : 'border-[#DDE6D8] hover:border-[#98CC6B] bg-white hover:bg-[#EEF2EC]/40'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} shadow-xs`}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#EEF2EC] border border-[#DDE6D8] flex items-center justify-center text-[#24361B] group-hover:scale-105 transition-transform">
              <UploadCloud className="w-8 h-8 text-[#98CC6B]" />
            </div>

            <h3 className="text-base sm:text-lg font-bold text-[#24361B] font-heading mb-1">
              Drag &amp; Drop specimen image here
            </h3>
            <p className="text-xs sm:text-sm text-[#5D6B55] max-w-sm mx-auto mb-4 leading-relaxed">
              Upload a clear photograph of a citrus fruit or leaf. Supports JPG, PNG, and WebP up to 10 MB.
            </p>

            <button
              type="button"
              disabled={disabled}
              className="px-5 py-2.5 rounded-xl bg-[#24361B] hover:bg-[#98CC6B] text-white hover:text-[#24361B] border border-[#24361B] hover:border-[#98CC6B] text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer"
            >
              Browse Files
            </button>
          </div>
        )}
      </AnimatePresence>

      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3.5 rounded-2xl bg-[#ED7A3B]/10 border border-[#ED7A3B]/30 flex items-center gap-2.5 text-[#ED7A3B] text-xs sm:text-sm"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-[#ED7A3B]" />
          <span>{errorMessage}</span>
        </motion.div>
      )}
    </div>
  );
};
