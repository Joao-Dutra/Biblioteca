import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BookOpen, MessageCircle } from "lucide-react";
import ExchangeModal from "../components/ExchangeModal";

interface Review {
  id: number;
  conteudo: string;
  dataPublicacao: string;
  usuario: {
    id: number;
    nome: string;
  };
}

export default function BookDetail() {
  const { id } = useParams<{ id: string }>(); // Obtém o ID do livro pela URL
  const [book, setBook] = useState<any>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [exchangeRequested, setExchangeRequested] = useState(false);

  useEffect(() => {
    if (!id) return;

    // Busca detalhes do livro pelo ID
    fetch(`http://localhost:8080/livros/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((error) => console.error("Erro ao buscar livro:", error));

    // Busca resenhas do livro
    fetch(`http://localhost:8080/resenhas/livro/${id}`)
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Erro ao buscar resenhas:", error));
  }, [id]);

  // Função para enviar nova resenha
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.trim()) return; // Evita envio de resenhas vazias

    const userId = localStorage.getItem("userId"); // Obtém ID do usuário logado
    if (!userId) {
      alert("Erro: Usuário não autenticado.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:8080/resenhas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Se necessário
        },
        body: JSON.stringify({
          conteudo: newReview,
          usuario: { id: parseInt(userId) },
          livro: { id: parseInt(id!) },
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar resenha.");
      }

      const savedReview = await response.json();
      setReviews([...reviews, savedReview]); // Atualiza a lista de resenhas sem recarregar
      setNewReview(""); // Limpa o campo de texto
    } catch (error) {
      console.error("Erro ao enviar resenha:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para solicitar troca
  const handleRequestExchange = () => {
    setModalOpen(true);
    setIsSuccess(false);
  };

  // Confirmação da troca
  const handleConfirmExchange = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Erro: Usuário não autenticado.");
      return;
    }

    if (!book || !book.usuario || !book.usuario.id) {
      alert("Erro: Proprietário do livro não encontrado.");
      return;
    }

    const proprietarioId = book.usuario.id; // Obtém o ID do dono do livro

    try {
      const response = await fetch("http://localhost:8080/trocas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          solicitante: { id: parseInt(userId) }, // Quem está solicitando a troca
          proprietario: { id: proprietarioId }, // O dono do livro
          livroSolicitado: { id: parseInt(id!) }, // O livro que está sendo solicitado
          status: "Pendente",
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao solicitar troca: ${errorMessage}`);
      }

      setIsSuccess(true);
      setExchangeRequested(true);
    } catch (error) {
      console.error("Erro ao solicitar troca:", error);
    }
  };

  if (!book) return <p className="text-center text-lg">Carregando livro...</p>;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900">{book.titulo}</h1>
        <p className="text-xl text-gray-600 mb-4">{book.autor}</p>
        <p className="text-gray-700 mb-6">{book.editor}</p>
        <p className="text-gray-700 mb-6">
          Estado de Conservação: <strong>{book.estadoConservacao}</strong>
        </p>

        {/* Seção de Ações */}
        <div className="flex space-x-4">
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
          <button className="flex-1 border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors flex items-center justify-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            Enviar Mensagem
          </button>
        </div>
      </div>

      {/* Seção de Resenhas */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Resenhas</h2>
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="bg-gray-100 p-4 rounded-lg">
                <p className="font-semibold">{review.usuario.nome}</p>
                <p className="text-sm text-gray-600">{review.dataPublicacao}</p>
                <p className="mt-2">{review.conteudo}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Nenhuma resenha ainda.</p>
          )}
        </div>

        {/* Formulário para adicionar resenha */}
        <form onSubmit={handleReviewSubmit} className="mt-6">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Escreva sua resenha..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            required
          />
          <button
            type="submit"
            className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar Resenha"}
          </button>
        </form>
      </div>

      {/* Modal de Troca */}
      <ExchangeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        bookTitle={book.titulo}
        ownerName="Proprietário"
        onConfirm={handleConfirmExchange}
        isSuccess={isSuccess}
      />
    </div>
  );
}
