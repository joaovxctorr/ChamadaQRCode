import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const CadastroPresenca: React.FC = () => {
  const router = useRouter();
  const { qrData } = router.query; // Recupera o dado do QR Code
  const [name, setName] = useState('');
  const [matricula, setMatricula] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim() || !matricula.trim()) {
      setMessage('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/adicionar-chamada', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, matricula, qrData }), // Inclui o qrData no envio
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar dados. Por favor, tente novamente.');
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (error: any) {
      setMessage(error.message || 'Erro desconhecido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Cadastro de Presença</h1>
        {qrData && (
          <p className="mb-4 text-sm text-gray-700 text-center">
            QR Code recebido: <span className="font-semibold">{qrData}</span>
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nome Completo
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm"
              placeholder="Seu nome completo"
            />
          </div>

          <div>
            <label htmlFor="matricula" className="block text-sm font-medium text-gray-700">
              Matrícula
            </label>
            <input
              id="matricula"
              type="text"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm"
              placeholder="Sua matrícula"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      </div>
    </div>
  );
};

export default CadastroPresenca;
