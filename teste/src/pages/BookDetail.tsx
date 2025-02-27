import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star, BookOpen, MessageCircle } from "lucide-react";
import ExchangeModal from "../components/ExchangeModal";

interface Book {
  id: number;
  titulo: string;
  autor: string;
  descricao: string;
  estado_conservacao: string;
  usuario_id: number;
}

interface Review {
  id: number;
  usuario_id: number;
  livro_id: number;
  avaliacao: number;
  comentario: string;
  data: string;
}

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [exchangeRequested, setExchangeRequested] = useState(false);
  const [newReview, setNewReview] = useState({
    avaliacao: 5,
    comentario: "",
  });

  useEffect(() => {
    if (!id) return;

    // Buscar detalhes do livro
    fetch(`http://localhost:8080/livros/${id}`)
      .then((response) => response.json())
      .then((data: Book) => setBook(data))
      .catch((error) => console.error("Erro ao buscar livro:", error));

    // Buscar avaliações do livro pelo ID
    fetch(`http://localhost:8080/avaliacoes/livro/${id}`)
      .then((response) => response.json())
      .then((data: Review[]) => setReviews(data))
      .catch((error) => console.error("Erro ao buscar avaliações:", error));
  }, [id]);

  const handleRequestExchange = () => {
    setModalOpen(true);
    setIsSuccess(false);
  };

  const handleConfirmExchange = () => {
    // Simular API call para solicitar troca
    setTimeout(() => {
      setIsSuccess(true);
      setExchangeRequested(true);
    }, 500);
  };

  const handleSendReview = async () => {
    if (!book) return;

    const userId = localStorage.getItem("userId"); // Pegando o ID do usuário logado

    if (!userId) {
      alert("Você precisa estar logado para enviar uma resenha!");
      return;
    }

    const reviewData = {
      usuario_id: parseInt(userId, 10),
      livro_id: book.id,
      avaliacao: newReview.avaliacao,
      comentario: newReview.comentario,
      data: new Date().toISOString().split("T")[0], // Formato YYYY-MM-DD
    };

    try {
      const response = await fetch("http://localhost:8080/avaliacoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar a resenha.");
      }

      const savedReview = await response.json();
      setReviews((prevReviews) => [...prevReviews, savedReview]);
      setNewReview({ avaliacao: 5, comentario: "" });
    } catch (error) {
      console.error("Erro ao enviar resenha:", error);
    }
  };

  if (!book) return <p className="text-center text-[#594a42]">Carregando...</p>;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.titulo}</h1>
          <p className="text-xl text-gray-600">{book.autor}</p>
          <p className="text-gray-700 mt-4">{book.descricao}</p>

          <div className="mt-4 text-gray-700">
            <p>
              <strong>Estado de Conservação:</strong> {book.estado_conservacao}
            </p>
            <p>
              <strong>ID do Dono:</strong> {book.usuario_id}
            </p>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              className={`flex-1 px-6 py-3 rounded-lg flex items-center justify-center transition-colors ${
                exchangeRequested
                  ? "bg-green-100 text-green-800 border border-green-600 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
              onClick={handleRequestExchange}
              disabled={exchangeRequested}
            >
              <BookOpen className="h-5 w-5 mr-2" />
              {exchangeRequested ? "Troca Solicitada" : "Solicitar Troca"}
            </button>
          </div>
        </div>
      </div>

      {/* Avaliações */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Avaliações</h2>
        <div className="space-y-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="ml-3">
                    <p className="font-medium">Usuário {review.usuario_id}</p>
                    <div className="flex items-center">
                      {Array.from({ length: review.avaliacao }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto text-sm text-gray-500">{review.data}</span>
                </div>
                <p className="text-gray-700">{review.comentario}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Nenhuma avaliação para este livro.</p>
          )}
        </div>
      </div>

      {/* Formulário para enviar resenha */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Deixe sua avaliação</h2>
        <div className="space-y-4">
          <select
            className="w-full border rounded-lg p-2"
            value={newReview.avaliacao}
            onChange={(e) => setNewReview({ ...newReview, avaliacao: Number(e.target.value) })}
          >
            <option value={5}>5 - Excelente</option>
            <option value={4}>4 - Muito Bom</option>
            <option value={3}>3 - Bom</option>
            <option value={2}>2 - Regular</option>
            <option value={1}>1 - Ruim</option>
          </select>
          <textarea
            className="w-full border rounded-lg p-2"
            rows={3}
            placeholder="Escreva sua resenha..."
            value={newReview.comentario}
            onChange={(e) => setNewReview({ ...newReview, comentario: e.target.value })}
          />
          <button
            className="vintage-button w-full text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={handleSendReview}
          >
            Enviar Resenha
          </button>
        </div>
      </div>

      <ExchangeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        bookTitle={book.titulo}
        ownerName={`Usuário ${book.usuario_id}`}
        onConfirm={handleConfirmExchange}
        isSuccess={isSuccess}
      />
    </div>
  );
}
