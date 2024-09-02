import { useState } from 'react';

const CadastroPresenca: React.FC = () => {
  const [name, setName] = useState('');
  const [matricula, setMatricula] = useState(''); 
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Faz uma requisição HTTP para o endpoint '/api/adicionar-chamada'
    const response = await fetch('/api/adicionar-chamada', {
      method: 'POST',   // Define o método da requisição como POST, que é usado para enviar dados ao servidor
      
      headers: { // Define os cabeçalhos da requisição
        'Content-Type': 'application/json', // Indica que o corpo da requisição está no formato JSON
      },
      
      body: JSON.stringify({ name, matricula }), // Converte o corpo da requisição em uma string JSON
    });

    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Cadastro de Presença</h1>
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

          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md">
            Enviar
          </button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default CadastroPresenca;
