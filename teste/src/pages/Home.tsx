import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Repeat } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif font-bold text-[#2c1810] mb-6">
          Bem-vindo à BiblioTroca
        </h1>
        <p className="text-xl text-[#594a42] font-serif max-w-2xl mx-auto">
          Um espaço onde amantes da literatura se encontram para compartilhar histórias e memórias através de seus livros
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="vintage-card p-8 rounded-lg">
          <BookOpen className="h-12 w-12 text-[#8b4513] mb-4" />
          <h3 className="text-xl font-serif font-semibold mb-2 text-[#2c1810]">Cadastre seus Livros</h3>
          <p className="text-[#594a42] font-serif">
            Adicione suas obras literárias à nossa biblioteca e permita que outras pessoas descubram suas histórias
          </p>
        </div>

        <div className="vintage-card p-8 rounded-lg">
          <Repeat className="h-12 w-12 text-[#8b4513] mb-4" />
          <h3 className="text-xl font-serif font-semibold mb-2 text-[#2c1810]">Faça Trocas</h3>
          <p className="text-[#594a42] font-serif">
            Encontre novos tesouros literários e compartilhe os seus em nossa comunidade de leitores
          </p>
        </div>

        <div className="vintage-card p-8 rounded-lg">
          <Users className="h-12 w-12 text-[#8b4513] mb-4" />
          <h3 className="text-xl font-serif font-semibold mb-2 text-[#2c1810]">Compartilhe Opiniões</h3>
          <p className="text-[#594a42] font-serif">
            Participe de discussões enriquecedoras sobre suas leituras favoritas
          </p>
        </div>
      </div>

    
    
    </div>
  );
}