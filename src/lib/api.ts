const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

export interface ApiUser {
  id: number;
  name: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  tokenType: string;
  user: ApiUser;
}

export interface CategoryResponse {
  id: number;
  title: string;
}

export interface PostResponse {
  id: number;
  title: string;
  content: string;
  audioUrl: string;
  categoryId: number;
}

export interface PollResponse {
  id: number;
  title: string;
  description?: string | null;
  votesFor: number;
  votesAgainst: number;
}

export interface ArticleResponse {
  title: string;
  audio_url?: string | null;
  content: string;
}

export interface ChatResponse {
  uuid: string;
  userId: number;
}

export interface ChatMessageResponse {
  id: number;
  role: string;
  content: string;
}

type HttpMethod = 'GET' | 'POST';

const TOKEN_STORAGE_KEY = 'opina_token';
const USER_STORAGE_KEY = 'opina_user';

export function setStoredToken(token: string | null) {
  if (token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}

export function getStoredToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setStoredUser(user: ApiUser | null) {
  if (user) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_STORAGE_KEY);
  }
}

export function getStoredUser(): ApiUser | null {
  const raw = localStorage.getItem(USER_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ApiUser;
  } catch {
    return null;
  }
}

async function request<T>(
  path: string,
  options: RequestInit & { method?: HttpMethod } = {},
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  };

  const token = getStoredToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const body =
    options.body && typeof options.body !== 'string'
      ? JSON.stringify(options.body)
      : options.body;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    body,
  });

  const text = await response.text();
  let data: any = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    const message =
      (data && (data.message || data.error)) ||
      'Erro ao comunicar com o servidor.';
    throw new Error(message);
  }

  return data as T;
}

export const api = {
  login(credentials: { email: string; password: string }) {
    return request<LoginResponse>('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: credentials,
    });
  },

  register(payload: { name: string; email: string; password: string }) {
    return request<ApiUser>('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
    });
  },

  logout() {
    return request<void>('/auth/logout', { method: 'POST' });
  },

  listCategories() {
    return request<CategoryResponse[]>('/categories');
  },

  followCategories(categoryIds: number[]) {
    return request<CategoryResponse[]>('/categories/follow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { categories: categoryIds },
    });
  },

  listFollowedPosts() {
    return request<PostResponse[]>('/categories/followed/posts');
  },

  listPostsByCategory(categoryId: number) {
    return request<PostResponse[]>(`/posts/category/${categoryId}`);
  },

  createPost(payload: {
    title: string;
    content: string;
    audio_url: string;
    category_id: number;
  }) {
    return request<PostResponse>('/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
    });
  },

  listPolls() {
    return request<PollResponse[]>('/polls');
  },

  createPoll(payload: { title: string; description?: string | null }) {
    return request<PollResponse>('/polls', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
    });
  },

  votePoll(pollId: number, isInFavor: boolean) {
    return request<PollResponse>(`/polls/${pollId}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { is_in_favor: isInFavor },
    });
  },

  listArticles(title?: string) {
    const query = title ? `?title=${encodeURIComponent(title)}` : '';
    return request<{ data: ArticleResponse[] }>(
      `/articles/all${query}`,
    );
  },

  startChat() {
    return request<ChatResponse>('/chat/create', { method: 'POST' });
  },

  sendChatMessage(payload: { chat_uuid: string; message: string }) {
    return request<ChatMessageResponse>('/chat/send-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
    });
  },
};
