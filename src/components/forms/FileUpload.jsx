import { useCallback, useState } from 'react';

const FileUpload = ({ value, onChange, error, label = 'Resume', accept = '.pdf,.doc,.docx' }) => {
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onChange(file);
  }, [onChange]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onChange(file);
  };

  const handleDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);

  const fileName = value instanceof File ? value.name : (typeof value === 'string' ? value.split('/').pop() : null);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</label>
      )}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-xl transition-all duration-200 ${
          dragging
            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/10 scale-[1.01]'
            : error
            ? 'border-red-400 dark:border-red-500 bg-red-50 dark:bg-red-900/5'
            : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/40 hover:border-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/5'
        }`}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className="flex flex-col items-center justify-center gap-3 py-8 px-4 text-center pointer-events-none">
          {fileName ? (
            <>
              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate max-w-xs">{fileName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Click or drop to replace</p>
              </div>
            </>
          ) : (
            <>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                dragging ? 'bg-indigo-100 dark:bg-indigo-900/40' : 'bg-gray-100 dark:bg-gray-700/60'
              }`}>
                <svg className={`w-6 h-6 transition-colors ${dragging ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500'}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <span className="text-indigo-600 dark:text-indigo-400">Click to upload</span> or drag & drop
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</p>
              </div>
            </>
          )}
        </div>
      </div>
      {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
};

export default FileUpload;
