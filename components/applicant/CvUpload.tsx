'use client';

import { useState, useRef } from 'react';
import { uploadCv } from '@/lib/services/cvs.service';

export default function CvUpload({ userId, token }: { userId: number, token: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [result, setResult] = useState<{ name: string; url: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(selected: File | null) {
    if (!selected) return;
    setFile(selected);
    setStatus('idle');
    setResult(null);
    setErrorMsg('');
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  }

  async function handleUpload() {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId.toString());

    setStatus('loading');
    try {
      const data = await uploadCv(file, userId, token);

      setStatus('ok');
      setResult({
      name: data.data.originalName,
      url: `${process.env.NEXT_PUBLIC_API_URL}/${data.data.directory}/${data.data.storedName}`,
    });
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message);
    }
}

  return (
    <div className="flex flex-col gap-4">

      {/* Zona de drop */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`
          cursor-pointer border-2 border-dashed rounded-xl p-8
          flex flex-col items-center justify-center gap-3 transition-colors
          ${dragging
            ? 'border-orange-400 bg-orange-400/10'
            : file
              ? 'border-green-500 bg-green-500/10'
              : 'border-gray-600 bg-gray-800/50 hover:border-gray-400 hover:bg-gray-700/50'
          }
        `}
      >
        {/* Ícono */}
        <div className="text-4xl">
          {file ? '📄' : '📂'}
        </div>

        {file ? (
          <>
            <p className="text-white text-sm font-medium">{file.name}</p>
            <p className="text-gray-400 text-xs">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <p className="text-gray-500 text-xs">
              Hacé click para cambiar el archivo
            </p>
          </>
        ) : (
          <>
            <p className="text-gray-300 text-sm font-medium">
              Arrastrá tu CV acá o hacé click para seleccionar
            </p>
            <p className="text-gray-500 text-xs">PDF, DOC o DOCX — máximo 5MB</p>
          </>
        )}

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        />
      </div>

      {/* Botón subir */}
      <button
        onClick={handleUpload}
        disabled={!file || status === 'loading'}
        className={`
          w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors
          ${!file || status === 'loading'
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-orange-500 hover:bg-orange-600 text-white cursor-pointer'
          }
        `}
      >
        {status === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Subiendo...
          </span>
        ) : 'Subir CV'}
      </button>

      {/* Éxito — preview y link */}
      {status === 'ok' && result && (
        <div className="flex items-center justify-between bg-green-900/30 border border-green-700 rounded-lg px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="text-xl">✅</span>
            <div>
              <p className="text-green-400 text-sm font-medium">CV cargado correctamente</p>
              <p className="text-gray-400 text-xs mt-0.5">{result.name}</p>
            </div>
          </div>
          
           <a href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-400 hover:text-orange-300 text-xs underline cursor-pointer"
          >
            Ver CV
          </a>
        </div>
      )}

      {/* Error */}
      {status === 'error' && (
        <div className="flex items-center gap-3 bg-red-900/30 border border-red-700 rounded-lg px-4 py-3">
          <span className="text-xl">❌</span>
          <p className="text-red-400 text-sm">{errorMsg}</p>
        </div>
      )}

    </div>
  );
}