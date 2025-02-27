import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, BookOpen, MessageCircle } from 'lucide-react';
import ExchangeModal from '../components/ExchangeModal';

const MOCK_BOOK = {
  id: '1',
  title: 'O Senhor dos Anéis',
  author: 'J.R.R. Tolkien',
  cover_url: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400',
  description: 'Em uma terra fantástica e única, um hobbit recebe de presente de seu tio um anel mágico e maligno que precisa ser destruído antes que caia nas mãos do mal. Para isso, o hobbit Frodo tem um caminho árduo pela frente, onde encontra perigo, medo e personagens bizarros.',
  condition: 'excellent',
  status: 'available',
  owner: {
    name: 'João Silva',
    avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'
  }
};

const MOCK_REVIEWS = [
  {
    id: '1',
    user: {
      name: 'Maria Santos',
      avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
    },
    rating: 5,
    content: 'Uma obra-prima da literatura fantástica! A narrativa é envolvente do começo ao fim.',
    created_at: '2024-02-20'
  }
];

export default function BookDetail() {
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [exchangeRequested, setExchangeRequested] = useState(false);

  const handleRequestExchange = () => {
    setModalOpen(true);
    setIsSuccess(false);
  };

  const handleConfirmExchange = () => {
    // Simulate API call to request exchange
    setTimeout(() => {
      setIsSuccess(true);
      setExchangeRequested(true);
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <div className="aspect-[3/4] relative">
              <img
                src={MOCK_BOOK.cover_url}
                alt={MOCK_BOOK.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="p-6 md:w-2/3">
            <div className="flex items-center mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{MOCK_BOOK.title}</h1>
              <div className="ml-4 flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-gray-600">4.5</span>
              </div>
            </div>
            <p className="text-xl text-gray-600 mb-4">{MOCK_BOOK.author}</p>
            <p className="text-gray-700 mb-6">{MOCK_BOOK.description}</p>
            
            <div className="flex items-center mb-6">
              <img
                src={MOCK_BOOK.owner.avatar_url}
                alt={MOCK_BOOK.owner.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Proprietário</p>
                <p className="font-medium">{MOCK_BOOK.owner.name}</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button 
                className={`flex-1 px-6 py-3 rounded-lg flex items-center justify-center transition-colors ${
                  exchangeRequested 
                    ? 'bg-green-100 text-green-800 border border-green-600 cursor-not-allowed' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
                onClick={handleRequestExchange}
                disabled={exchangeRequested}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                {exchangeRequested ? 'Troca Solicitada' : 'Solicitar Troca'}
              </button>
              <button className="flex-1 border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors flex items-center justify-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                Enviar Mensagem
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Avaliações</h2>
        <div className="space-y-6">
          {MOCK_REVIEWS.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <img
                  src={review.user.avatar_url}
                  alt={review.user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <p className="font-medium">{review.user.name}</p>
                  <div className="flex items-center">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <span className="ml-auto text-sm text-gray-500">{review.created_at}</span>
              </div>
              <p className="text-gray-700">{review.content}</p>
            </div>
          ))}
        </div>
      </div>

      <ExchangeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        bookTitle={MOCK_BOOK.title}
        ownerName={MOCK_BOOK.owner.name}
        onConfirm={handleConfirmExchange}
        isSuccess={isSuccess}
      />
    </div>
  );
}