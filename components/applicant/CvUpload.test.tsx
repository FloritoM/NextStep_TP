import { render, screen, waitFor,fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CvUpload from './CvUpload';

jest.mock('@/lib/services/cvs.service', () => ({
  uploadCv: jest.fn(),
}));

import { uploadCv } from '@/lib/services/cvs.service';

const mockUploadResponse = {
  data: {
    originalName: 'cv.pdf',
    directory: 'uploads/cv',
    storedName: 'cv.pdf',
  },
};

describe('CvUpload', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('selecciona archivo al soltarlo en la zona de drop', () => {
    render(<CvUpload userId={1} token="token" />);

    const file = new File(['contenido'], 'cv.pdf', { type: 'application/pdf' });
    const dropZone = screen.getByText(/Arrastrá tu CV acá/i).closest('div')!;

    fireEvent.drop(dropZone, {
      dataTransfer: { files: [file] },
    });

    expect(screen.getByText('cv.pdf')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Subir CV' })).toBeEnabled();
  });



  it('muestra la zona de carga inicial', () => {
    render(<CvUpload userId={1} token="token" />);

    expect(screen.getByText(/Arrastrá tu CV acá/i)).toBeInTheDocument();
    expect(screen.getByText(/PDF, DOC o DOCX/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Subir CV' })).toBeDisabled();
  });

  it('habilita el botón al seleccionar un archivo', async () => {
    const user = userEvent.setup();
    render(<CvUpload userId={1} token="token" />);

    const file = new File(['contenido'], 'cv.pdf', { type: 'application/pdf' });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;

    await user.upload(input, file);

    expect(screen.getByText('cv.pdf')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Subir CV' })).toBeEnabled();
  });

  it('sube el CV y muestra éxito', async () => {
    (uploadCv as jest.Mock).mockResolvedValueOnce(mockUploadResponse);

    const user = userEvent.setup();
    render(<CvUpload userId={1} token="token" />);

    const file = new File(['contenido'], 'cv.pdf', { type: 'application/pdf' });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;

    await user.upload(input, file);
    await user.click(screen.getByRole('button', { name: 'Subir CV' }));

    await waitFor(() => {
      expect(uploadCv).toHaveBeenCalledWith(file, 1, 'token');
      expect(screen.getByText('CV cargado correctamente')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Ver CV' })).toHaveAttribute(
        'href',
        'http://localhost:3001/uploads/cv/cv.pdf',
      );
    });
  });

  it('muestra error si falla la subida', async () => {
    (uploadCv as jest.Mock).mockRejectedValueOnce(new Error('Archivo muy grande'));

    const user = userEvent.setup();
    render(<CvUpload userId={1} token="token" />);

    const file = new File(['x'], 'cv.pdf', { type: 'application/pdf' });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;

    await user.upload(input, file);
    await user.click(screen.getByRole('button', { name: 'Subir CV' }));

    expect(await screen.findByText('Archivo muy grande')).toBeInTheDocument();
    expect(screen.queryByText('CV cargado correctamente')).not.toBeInTheDocument();
  });
});