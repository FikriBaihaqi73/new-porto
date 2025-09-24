import { ref } from 'vue';

export const useAuth = () => {
  const token = ref<string | null>(null);

  const setToken = (newToken: string) => {
    token.value = newToken;
    if (process.client) {
      localStorage.setItem('authToken', newToken);
    }
  };

  const getToken = () => {
    if (token.value) {
      return token.value;
    }
    if (process.client) {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        token.value = storedToken;
        return storedToken;
      }
    }
    return null;
  };

  const removeToken = () => {
    token.value = null;
    if (process.client) {
      localStorage.removeItem('authToken');
    }
  };

  // Initialize token from localStorage on setup
  if (process.client) {
    getToken();
  }

  return {
    token,
    setToken,
    getToken,
    removeToken,
  };
};
