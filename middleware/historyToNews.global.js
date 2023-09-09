export default defineNuxtRouteMiddleware((to, from) => {

  const nuxtApp = useNuxtApp();

  const { locale } = nuxtApp.$i18n;
  console.log('redirect', from)
  if (from.path === `/${locale.value}/history` && to.path !== `/${locale.value}/news`) {

    return navigateTo({
      path: `/${locale.value}/news`, 
      redirectCode: 301 
    });
  }
})