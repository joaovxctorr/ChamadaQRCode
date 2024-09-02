import React from 'react';
import Image from 'next/image'; 

interface QRCodeComponentProps {
  data: string; // Define que o componente receberá uma prop chamada 'data' do tipo string
}

const QRCodeComponent: React.FC<QRCodeComponentProps> = ({ data }) => {
  // Gera a URL do QR Code usando a API externa com base nos dados fornecidos
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data)}`;

  // Retorna o JSX para renderizar o componente
  return (
    <div className="flex justify-center mt-8">
      <Image
        src={qrCodeUrl}
        alt="QR Code"
        width={150} // Define a largura da imagem
        height={150} // Define a altura da imagem
        quality={100} // Define a qualidade da imagem (opcional)
      />
    </div>
  );
};

export default QRCodeComponent;
