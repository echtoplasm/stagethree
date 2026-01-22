const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface Post {
  id: number; 
  user_id: number;
  title: string;
  content: string;
  published: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export const fetchAllPosts = async (): Promise<Post[]> => {
  let res = await fetch(`${API_URL}/api/posts`);
  console.log('fetching for fetchAllPosts...');
  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }
  return res.json();
};
