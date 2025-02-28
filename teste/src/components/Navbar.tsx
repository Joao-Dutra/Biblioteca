import React from 'react';
import { Link } from 'react-router-dom';
import { Book, User, PlusCircle, Repeat, LogIn } from 'lucide-react';

export default function Navbar() {
  const userEmail = localStorage.getItem("userEmail"); // Obtém o email do usuário armazenado

  return (
    <nav className="bg-[#2c1810] shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Book className="h-8 w-8 text-[#f8f3e7]" />
            <span className="text-xl font-serif font-bold text-[#f8f3e7]">BiblioTroca</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/add-book" className="text-[#f8f3e7] hover:text-[#d4a373] transition-colors font-serif flex items-center">
              <PlusCircle className="h-5 w-5 mr-1" />
              Adicionar Livro
            </Link>
            <Link to="/exchanges" className="text-[#f8f3e7] hover:text-[#d4a373] transition-colors font-serif flex items-center">
              <Repeat className="h-5 w-5 mr-1" />
              Trocas
            </Link>

            {userEmail ? (
              // Se o usuário estiver logado, redireciona para o perfil dele
              <Link to={`/profile/${userEmail}`} className="flex items-center text-[#f8f3e7] hover:text-[#d4a373] transition-colors font-serif">
                <User className="h-5 w-5 mr-1" />
                Perfil
              </Link>
            ) : (
              // Se não estiver logado, mostra o botão de login
              <Link to="/login" className="flex items-center text-[#f8f3e7] hover:text-[#d4a373] transition-colors font-serif">
                <LogIn className="h-5 w-5 mr-1" />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
