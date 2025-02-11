export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  created_at: string;
}

export interface Activity {
  id: number;
  description: string;
  time: string;
} 