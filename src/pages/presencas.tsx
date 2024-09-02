import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, Timestamp, DocumentData, query, where } from 'firebase/firestore';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // CSS do calendário
import { ptBR } from 'date-fns/locale'; // Importa o locale pt-BR do date-fns

type ValuePiece = Date | null; // Representa uma única data ou a ausência de uma data.
type Value = ValuePiece | [ValuePiece, ValuePiece]; // Representa uma única data ou um intervalo de datas.

// Define a interface para o tipo de dados de presença
interface Presenca {
  name: string;
  matricula: number;
  timestamp: string;
}

const Presencas: React.FC = () => {
  const [presencas, setPresencas] = useState<Presenca[]>([]); // Estado para armazenar a lista de presenças
  const [selectedDate, setSelectedDate] = useState<Value>(new Date()); // Estado para armazenar a data selecionada

  useEffect(() => {
    const fetchPresencas = async () => {
      if (!selectedDate || Array.isArray(selectedDate)) return; // Se não há uma data selecionada ou é um intervalo, não faça a busca

      const presencaCollection = collection(db, 'chamadas'); // Obtém a coleção 'chamadas' do Firestore
      const selectedDateString = selectedDate.toISOString().split('T')[0]; // Converte a data selecionada para o formato 'YYYY-MM-DD'
      
      const q = query( // Cria a query para buscar os documentos da coleção 'chamadas' filtrados pela data
        presencaCollection,
        where('timestamp', '>=', Timestamp.fromDate(new Date(`${selectedDateString}T00:00:00Z`))),
        where('timestamp', '<', Timestamp.fromDate(new Date(`${selectedDateString}T23:59:59Z`)))
      );
      
      const presencaSnapshot = await getDocs(q); // Obtém os documentos da coleção filtrados pela data
      
      const presencaList = presencaSnapshot.docs.map((doc) => { // Mapeia os documentos para o formato de presença
        const data = doc.data() as DocumentData;

        // Formata o timestamp corretamente
        const formattedTimestamp = data.timestamp instanceof Timestamp 
          ? data.timestamp.toDate().toLocaleString('pt-BR') // Se for um Timestamp, formata para string em português
          : new Date(data.timestamp).toLocaleString('pt-BR'); // Caso contrário, assume que já é uma string e formata

        return {
          name: data.name,
          matricula: Number(data.matricula), // Converte a matrícula para número
          timestamp: formattedTimestamp,
        } as Presenca;
      });
      
      setPresencas(presencaList); // Atualiza o estado com a lista de presenças
    };

    fetchPresencas(); // Chama a função para buscar as presenças
  }, [selectedDate]); // O efeito será executado sempre que a data selecionada mudar

  // Função para lidar com a mudança de data no calendário
  const handleDateChange = (value: Value) => {
    if (Array.isArray(value) && value.length > 0) {
      setSelectedDate(value[0]); // Se o componente do calendário retornar um intervalo, escolha a primeira data do intervalo
    } else {
      setSelectedDate(value); // Atualiza a data selecionada
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">Lista de Presenças</h1>
        <div className="mt-4">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            locale="pt-BR" // Define o locale para português
            className="mx-auto" 
          />
        </div>
      </div>
      
      <ul className="space-y-4 mt-4">
        {presencas.map((presenca, index) => (
          <li key={index} className="p-4 border border-gray-300 rounded-md shadow-sm">
            <p><strong>Nome:</strong> {presenca.name}</p>
            <p><strong>Matrícula:</strong> {presenca.matricula}</p> 
            <p><strong>Data e Hora da Presença:</strong> {presenca.timestamp}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Presencas;
