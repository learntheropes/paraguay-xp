export default defineNuxtRouteMiddleware(async (to, from) => {

  const {
    public: {
      whatsappAdmin
    }
  } = useRuntimeConfig();

  const { status } = useAuth();

  if (status.value === 'authenticated') {

    const { data } = await useFetch('/api/admin/user');

    if (!data.value) {

      throw createError({
        statusCode: 403,
        statusMessage: 'Unauthorized'
      });
    }

    return;
  }
})