import { useAuth } from '~/composables/useAuth';

export default defineNuxtPlugin((nuxtApp) => {
  globalThis.$fetch = $fetch.create({
    onRequest({ options }) {
      const auth = useAuth();
      const token = auth.getToken();

      if (token) {
        options.headers = options.headers || new Headers();
        options.headers.set('Authorization', `Bearer ${token}`);
      }
    },
  });
});
