import React, { useState } from 'react';

interface TranscriptPanelProps {
  title?: string;
  transcript: string;
  fileName: string;
}

export const TranscriptPanel: React.FC<TranscriptPanelProps> = ({
  title = 'Subtítulos y transcripción',
  transcript,
  fileName,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = () => {
    const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName.endsWith('.txt') ? fileName : `${fileName}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className='border rounded p-3 bg-white'>
      <div className='d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2'>
        <h6 className='fw-bold mb-0'>{title}</h6>
        <div className='d-flex gap-2'>
          <button
            type='button'
            className='btn btn-outline-secondary btn-sm'
            onClick={() => setIsOpen(prev => !prev)}
            aria-expanded={isOpen}
            aria-controls='transcript-content'
          >
            {isOpen ? 'Ocultar subtítulos' : 'Mostrar subtítulos'}
          </button>
          <button
            type='button'
            className='btn btn-outline-primary btn-sm'
            onClick={handleDownload}
          >
            Descargar transcripción
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          id='transcript-content'
          className='small text-muted'
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {transcript}
        </div>
      )}
    </div>
  );
};

