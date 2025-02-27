import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book as BookIcon, Search } from 'lucide-react';


interface Book {
  id: number;
  titulo: string;
  autor: string;
  editor: string;
  estado_conservacao: string;
  usuario_id: number; // ID do dono do livro
}

export default function Exchanges() {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8080/livros');
        const data = await response.json();
        setBooks(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Filtragem apenas pelo nome ou autor
  const filteredBooks = books.filter((book) => {
    return (
      book.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.autor?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading) {
    return <p className="text-center text-lg">Carregando...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-[#2c1810]">Solicitar Trocas</h1>
        <p className="text-[#594a42] font-serif mt-2">
          Encontre livros disponíveis para troca em nossa comunidade
        </p>
      </div>

      {/* Barra de pesquisa */}
      <div className="vintage-card p-6 rounded-lg mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[#8b4513]" />
          </div>
          <input
            type="text"
            placeholder="Buscar por título ou autor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="vintage-input block w-full pl-10 pr-3 py-2 rounded-lg"
          />
        </div>
      </div>

      {/* Listagem de livros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBooks.map((book) => (
          <div key={book.id} className="vintage-card overflow-hidden rounded-lg">
            <div className="p-6">
              <h3 className="text-xl font-serif font-semibold text-[#2c1810] mb-2">{book.titulo}</h3>
              <p className="text-[#594a42] font-serif">{book.autor}</p>
              <p className="text-[#594a42] font-serif text-sm mt-1">
                Estado: <span className="font-bold">{book.estado_conservacao || 'Não informado'}</span>
              </p>

              {/* Exibe o ID do dono do livro */}
              <div className="mt-2 text-sm text-gray-700">
                <strong>Dono do livro (ID):</strong> {book.usuario_id}
              </div>

              <div className="mt-4">
                <Link
                  to={`/books/${book.id}`}
                  className="block text-center vintage-button py-2 rounded-lg font-serif text-sm hover:shadow-lg transition-all"
                >
                  Ver Detalhes
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
