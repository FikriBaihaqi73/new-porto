import { ref } from 'vue';

export const useAuth = () => {
  const authTokenCookie = useCookie<string | null>('authToken'); // Use useCookie
  const token = ref<string | null>(authTokenCookie.value);

  const setToken = (newToken: string) => {
    token.value = newToken;
    authTokenCookie.value = newToken; // Store in cookie
  };

  const getToken = () => {
    return authTokenCookie.value;
  };

  const removeToken = () => {
    token.value = null;
    authTokenCookie.value = null; // Remove from cookie
  };

  // No need for explicit initialization from localStorage as useCookie handles it

  return {
    token,
    setToken,
    getToken,
    removeToken,
  };
};
