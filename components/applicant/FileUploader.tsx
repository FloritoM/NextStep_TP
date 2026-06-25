'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

export default function FileUploader() {
  const [archivo, setArchivo] = useState<File | null>(null)

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    onDrop: (archivosAceptados) => {
      setArchivo(archivosAceptados[0])
    }
  })

  function removeFile(){
    setArchivo(null);
  }

  return (
    <div className="flex items-center gap-4">
      <div
        {...getRootProps()}
        className="w-[25%] rounded-xl border border-gray-700 bg-gray-800/50 p-5 cursor-pointer flex items-center justify-center"
      >
        <input {...getInputProps()} />
        <p className="text-white text-[1.5rem] font-bold">
          Arrastrá tu CV o hacé click para seleccionarlo
        </p>
      </div>

      {archivo && (
        <p className="text-white text-sm">{archivo.name} <FontAwesomeIcon onClick={removeFile} icon={faTrashCan} className="text-white cursor-pointer" /></p>
      )}
      <div>
          
        </div>
    </div>
  )
}