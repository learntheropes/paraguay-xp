export default defineNuxtRouteMiddleware(async () => {

  const { status } = useAuth();

  if (status.value === 'authenticated') {

    const { data } = await useFetch('/api/admin/user');

    if (!data.value) {

      throw createError({
        statusCode: 403,
        statusMessage: 'Unauthorized'
      });
    }

    return 'ok';
  }
})