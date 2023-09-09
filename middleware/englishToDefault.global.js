import { defaultLocale } from "../assets/js/localization";

export default defineNuxtRouteMiddleware((to, from) => {

  if (from.path.startsWith('/en/') && to.path !== from.path.replace('/en/', `/${defaultLocale}/`)) {

    return navigateTo({
      path: from.path.replace('/en/', `/${defaultLocale}/`), 
      query: from.query,
      hash: from.hash,
      redirectCode: 301 
    });
  }
})