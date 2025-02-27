import React, { useState } from 'react';
import { Book } from 'lucide-react';
import ExchangeModal from '../components/AddModal'; // Reutilizando o modal do Exchange

export default function AddBook() {
  const [bookData, setBookData] = useState({
    titulo: '',
    autor: '',
    editor: '',
    estado_conservacao: 'Ótimo',
    usuario_id: localStorage.getItem("userId") || '' // Pegando ID do usuário logado
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!bookData.usuario_id) {
      setError('Erro: ID do usuário não encontrado. Faça login novamente.');
      setModalOpen(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/livros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}` // Se a API exigir autenticação
        },
        body: JSON.stringify({
          titulo: bookData.titulo,
          autor: bookData.autor,
          editor: bookData.editor,
          estado_conservacao: bookData.estado_conservacao, // ✅ Enviando corretamente
          usuario_id: bookData.usuario_id // ✅ Pegando o usuário logado
        })
      });

      if (!response.ok) {
        throw new Error(`Erro ao adicionar livro: ${await response.text()}`);
      }

      setIsSuccess(true);
      setModalOpen(true);
      setBookData({
        titulo: '',
        autor: '',
        editor: '',
        estado_conservacao: 'Ótimo',
        usuario_id: bookData.usuario_id
      });
    } catch (error) {
    
      setModalOpen(true);
      setIsSuccess(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-serif font-bold text-[#2c1810]">Adicionar Novo Livro</h1>
        <p className="text-[#594a42] font-serif mt-2">
          Compartilhe um livro da sua coleção para troca
        </p>
      </div>

      <div className="vintage-card p-8 rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="titulo" className="block text-sm font-serif font-medium text-[#2c1810] mb-1">
                Título do Livro
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={bookData.titulo}
                onChange={handleChange}
                className="vintage-input block w-full px-3 py-2 rounded-lg"
                required
              />
            </div>

            <div>
              <label htmlFor="autor" className="block text-sm font-serif font-medium text-[#2c1810] mb-1">
                Autor
              </label>
              <input
                type="text"
                id="autor"
                name="autor"
                value={bookData.autor}
                onChange={handleChange}
                className="vintage-input block w-full px-3 py-2 rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="editor" className="block text-sm font-serif font-medium text-[#2c1810] mb-1">
              Edição
            </label>
            <input
              type="text"
              id="editor"
              name="editor"
              value={bookData.editor}
              onChange={handleChange}
              className="vintage-input block w-full px-3 py-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label htmlFor="estado_conservacao" className="block text-sm font-serif font-medium text-[#2c1810] mb-1">
              Estado de Conservação
            </label>
            <select
              id="estado_conservacao"
              name="estado_conservacao"
              value={bookData.estado_conservacao}
              onChange={handleChange}
              className="vintage-input block w-full px-3 py-2 rounded-lg"
              required
            >
              <option value="Novo">Novo</option>
              <option value="Ótimo">Ótimo</option>
              <option value="Bom">Bom</option>
              <option value="Regular">Regular</option>
            </select>
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="vintage-button px-8 py-3 rounded-lg font-serif text-lg flex items-center hover:shadow-lg transition-all"
            >
              <Book className="h-5 w-5 mr-2" />
              Adicionar Livro
            </button>
          </div>
        </form>
      </div>

      {/* Popup de confirmação (reutilizando o ExchangeModal) */}
      {modalOpen && (
        <ExchangeModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          bookTitle={bookData.titulo}
          ownerName="Você"
          onConfirm={() => setModalOpen(false)}
          isSuccess={isSuccess}
        />
      )}
    </div>
  );
}
