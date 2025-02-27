import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ Adicionado `useNavigate`
import { Mail, Lock, BookOpen } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState(''); // ✅ Corrigido de `password` para `senha`
  const [error, setError] = useState(''); // ✅ Adicionado `setError` corretamente
  const navigate = useNavigate(); // ✅ Adicionado `useNavigate` para redirecionamento

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }), // ✅ Correto agora
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ${response.status}: ${errorMessage}`);
      }

      const data = await response.json();
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('token', data.token);

      // 🚀 Redireciona para a página do perfil do usuário com o email
      navigate(`/profile/${data.email}`);
    } catch (err: any) {
      console.error('Erro no login:', err.message);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="vintage-card p-8 rounded-lg w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <BookOpen className="h-16 w-16 text-[#8b4513]" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#2c1810] mb-2">Bem-vindo de volta!</h1>
          <p className="text-[#594a42] font-serif">Entre para continuar trocando livros</p>
        </div>

        {/* ✅ Exibe erro caso ocorra */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-serif font-medium text-[#2c1810] mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-[#8b4513]" />
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="vintage-input block w-full pl-10 pr-3 py-2 rounded-lg"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="senha" className="block text-sm font-serif font-medium text-[#2c1810] mb-1">
              Senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-[#8b4513]" />
              </div>
              <input
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="vintage-input block w-full pl-10 pr-3 py-2 rounded-lg"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="vintage-button w-full px-4 py-3 rounded-lg font-serif text-lg hover:shadow-lg transition-all"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-center text-sm font-serif text-[#594a42]">
          Não tem uma conta?{' '}
          <Link to="/register" className="text-[#8b4513] hover:underline font-medium">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
