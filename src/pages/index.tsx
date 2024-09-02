import { useRouter } from 'next/router';
import QRCodeComponent from '../components/QRCodeComponent';

const QRCodePage: React.FC = () => {
  const router = useRouter();
  const qrData = 'https://example.com/cadastro'; // URL que leva para a página de cadastro

  const handleScan = () => {
    router.push('/cadastro');
  };

  const handleViewPresencas = () => {
    router.push('/presencas');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-center">Leia o QR Code para fazer a chamada</h1>
      <QRCodeComponent data={qrData} />
      <button 
        onClick={handleScan}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Não consigo ler o Qr Code
      </button>
      
      <button 
        onClick={handleViewPresencas}
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
      >
        Ver Presenças
      </button>
    </div>
  );
};

export default QRCodePage;
