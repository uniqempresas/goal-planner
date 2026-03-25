// Mock user data for development
export interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string; // In production, never store plain passwords
  avatar: string;
  bio: string;
  createdAt: string;
}

export const mockUsers: MockUser[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@example.com',
    password: 'password123',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=joao',
    bio: 'Empresário buscando equilíbrio entre trabalho e vida pessoal',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@example.com',
    password: 'password123',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
    bio: 'Professora e mãe dedicada',
    createdAt: '2024-02-20T14:30:00Z',
  },
  {
    id: '3',
    name: 'Pedro Oliveira',
    email: 'pedro@example.com',
    password: 'password123',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pedro',
    bio: 'Desenvolvedor focado em crescimento profissional',
    createdAt: '2024-03-10T08:00:00Z',
  },
];

// Helper function to find user by email
export const findUserByEmail = (email: string): MockUser | undefined => {
  return mockUsers.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );
};

// Helper function to validate credentials
export const validateCredentials = (
  email: string,
  password: string
): Omit<MockUser, 'password'> | null => {
  const user = findUserByEmail(email);
  if (user && user.password === password) {
    // Return user without password
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      createdAt: user.createdAt,
    };
  }
  return null;
};
