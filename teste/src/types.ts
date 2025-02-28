export interface User {
  id: string;
  email: string;
  name: string;
  bio: string;
  avatar_url: string;
  created_at: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  cover_url: string;
  description: string;
  condition: 'new' | 'excellent' | 'good' | 'fair';
  owner: User;
  status: 'available' | 'exchanged' | 'pending';
  created_at: string;
}

export interface Review {
  id: string;
  book: Book;
  user: User;
  rating: number;
  content: string;
  created_at: string;
}

export interface Exchange {
  id: string;
  book: Book;
  requester: User;
  owner: User;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  created_at: string;
}