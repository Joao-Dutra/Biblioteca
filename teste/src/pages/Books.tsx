import React from 'react';
import { Link } from 'react-router-dom';
import { Book as BookIcon, Star } from 'lucide-react';

const MOCK_BOOKS = [
  {
    id: '1',
    title: 'O Senhor dos Anéis',
    author: 'J.R.R. Tolkien',
    cover_url: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400',
    condition: 'excellent',
    status: 'available',
  },
  {
    id: '2',
    title: 'Duna',
    author: 'Frank Herbert',
    cover_url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400',
    condition: 'good',
    status: 'available',
  },
  {
    id: '3',
    title: 'Fundação',
    author: 'Isaac Asimov',
    cover_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
    condition: 'new',
    status: 'available',
  }
];

export default function Books() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-[#2c1810]">Nossa Biblioteca</h1>
        <button className="vintage-button px-6 py-3 rounded-lg font-serif flex items-center hover:shadow-lg transition-all">
          <BookIcon className="h-5 w-5 mr-2" />
          Adicionar Livro
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_BOOKS.map((book) => (
          <Link
            key={book.id}
            to={`/books/${book.id}`}
            className="vintage-card overflow-hidden rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="aspect-[3/4] relative">
              <img
                src={book.cover_url}
                alt={book.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-[#f8f3e7] px-3 py-1 rounded-full text-sm font-serif font-medium text-[#2c1810] border-2 border-[#2c1810]">
                {book.condition}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-serif font-semibold text-[#2c1810] mb-2">{book.title}</h3>
              <p className="text-[#594a42] font-serif">{book.author}</p>
              <div className="mt-4 flex items-center">
                <Star className="h-5 w-5 text-[#8b4513] fill-current" />
                <span className="ml-1 text-sm font-serif text-[#594a42]">4.5 (12 avaliações)</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}