import React from 'react';
import Image from 'next/image'; 

interface QRCodeComponentProps {
  data: string; 
}

const QRCodeComponent: React.FC<QRCodeComponentProps> = ({ data }) => {
  // Gera a URL do QR Code usando a API externa com base nos dados fornecidos
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data)}`;

  return (
    <div className="flex justify-center mt-8">
      <Image
        src={qrCodeUrl}
        alt="QR Code"
        width={150} 
        height={150} 
        quality={100} 
      />
    </div>
  );
};

export default QRCodeComponent;
