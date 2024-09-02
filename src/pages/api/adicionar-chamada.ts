import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

// Função que trata as requisições para o endpoint '/api/adicionar-chamada'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') { // Verifica se o método da requisição é POST
    const { name, matricula } = req.body;  // Extrai os dados do corpo da requisição

    // Verifica se todos os campos necessários estão presentes
    if (!name || !matricula) {
      res.status(400).json({ message: 'Preencha todos os campos.' });
      return;
    }

    // Converte a matrícula para um número
    const matriculaNumber = Number(matricula);

    // Verifica se a matrícula é um número válido
    if (isNaN(matriculaNumber)) {
      res.status(400).json({ message: 'A matrícula deve ser um número válido.' });
      return;
    }

    try {
      // Adiciona um documento à coleção 'chamadas' no Firestore
      await addDoc(collection(db, 'chamadas'), {
        name,
        matricula: matriculaNumber, // Armazena a matrícula como número
        timestamp: Timestamp.now(),
      });
      res.status(200).json({ message: 'Presença registrada com sucesso!' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao registrar presença.' });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
