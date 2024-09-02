import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../firebaseConfig';  // Importa a configuração do Firebase
import { collection, addDoc, Timestamp } from 'firebase/firestore';  // Importa funções do Firestore

// Função que trata as requisições para o endpoint '/api/adicionar-chamada'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verifica se o método da requisição é POST
  if (req.method === 'POST') {
    // Extrai os dados do corpo da requisição
    const { name, matricula } = req.body;

    // Verifica se todos os campos necessários estão presentes
    if (!name || !matricula) {
      return res.status(400).json({ message: 'Preencha todos os campos.' });
    }

    // Converte a matrícula para um número
    const matriculaNumber = Number(matricula);

    // Verifica se a matrícula é um número válido
    if (isNaN(matriculaNumber)) {
      return res.status(400).json({ message: 'A matrícula deve ser um número válido.' });
    }

    try {
      // Adiciona um documento à coleção 'chamadas' no Firestore
      await addDoc(collection(db, 'chamadas'), {
        name,
        matricula: matriculaNumber,  // Armazena a matrícula como número
        timestamp: Timestamp.now(),  // Adiciona um timestamp atual
      });
      return res.status(200).json({ message: 'Presença registrada com sucesso!' });
    } catch (error) {
      console.error('Erro ao registrar presença:', error);  // Adiciona log do erro
      return res.status(500).json({ message: 'Erro ao registrar presença.' });
    }
  } else {
    // Retorna um erro se o método não for POST
    return res.status(405).json({ message: 'Método não permitido' });
  }
}
