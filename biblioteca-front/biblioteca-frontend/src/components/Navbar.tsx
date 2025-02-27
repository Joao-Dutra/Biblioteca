import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface User {
  id: number;
  nome: string;
  email: string;
  dataCadastro: string;
}

export default function Profile() {
  const { email } = useParams<{ email: string }>(); // Obtém o email da URL e tipa corretamente
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!email) return; // Evita chamadas desnecessárias

    fetch(`http://localhost:8080/usuarios/email/${email}`) // Faz requisição pelo email
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Erro ao buscar usuário:", error));
  }, [email]);

  if (!user) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Perfil de {user.nome}</h1>
      <p>Email: {user.email}</p>
      <p>Data de Cadastro: {new Date(user.dataCadastro).toLocaleDateString()}</p>
    </div>
  );
}
