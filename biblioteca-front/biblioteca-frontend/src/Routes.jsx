import RegisterBook from "./pages/RegisterBook"; // Importando a nova página

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-book" element={<RegisterBook />} /> {/* Adicionando a nova rota */}
      </Routes>
    </BrowserRouter>
  );
}
