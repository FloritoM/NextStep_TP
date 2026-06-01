'use client'

import { useDropzone } from 'react-dropzone'

export default function FileUploader() {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
  })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Arrastrá tu CV o hacé click para seleccionarlo</p>
    </div>
  )
}