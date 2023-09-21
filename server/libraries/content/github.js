import { ofetch } from 'ofetch';
import merge from 'lodash.merge';

const { 
  githubRepo,
  githubToken
 } = useRuntimeConfig();

const encodeContent = (path, data) => {

  if (path.startsWith('content/')) {

    let buff;
    try {
      const string = JSON.stringify(data, null, 2);
      const buff = new Buffer.from(string);
      return buff.toString('base64');
    } catch (error) {
      buff = data;
    }
    return buff;
  }

  else {

    const binaryImageData = atob(data.split(',')[1]);
    const buff = btoa(binaryImageData);
    return buff;
  };
}

const githubJson = ofetch.create({
  ignoreResponseError: true,
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `token ${githubToken}`
  },
  async onRequestError({ request, options, error }) {
    console.log('[fetch request error]', request, error);
  },
  async onResponseError({ request, response, options }) {
    console.log('[fetch response error]', request, response.status, response.body);
  },
})

const githubRaw = ofetch.create({
  ignoreResponseError: true,
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3.raw',
    Authorization: `token ${githubToken}`
  },
  async onRequestError({ request, options, error }) {
    console.log('[fetch request error]', request, error);
  },
  async onResponseError({ request, response, options }) {
    console.log('[fetch response error]', request, response.status, response.body);
  },
})

const getUrl = (path) => {
  return `/repos/${githubRepo}/contents/${path}`;
}

export const getRepoFile = async ({ path }) => {
  const url = getUrl(path);

  const getJson = () => githubJson(url);
  const getRaw = () => githubRaw(url);

  const [{ message, sha }, content] = await Promise.all([getJson(), getRaw()]);
  
  if (message === 'Not Found')  {

    return {
      content: {},
      sha: null
    }
  }

  else { 

    return {
      content,
      sha
    }
  }
}

export const addRepoFile = async ({ path, content, message }) => {

  // const binaryImageData = atob(content.split(',')[1]);
  // content = btoa(binaryImageData);

  const base64Data = content.split(',')[1];

// Convert base64 to binary data
const binaryData = Buffer.from(base64Data, 'base64')
content = binaryData.toString('base64')
  const url = getUrl(path);
  return await githubJson(url, {
    method: 'PUT',
    body: {
      message,
      content
    }
  });
}

export const updateRepoFile = async ({ path, content, message }) => {

  const url = getUrl(path);
  const { content: oldContent, sha } = await getRepoFile({ path });
  const newContent = merge(oldContent, content);

  return await githubJson(url, {
    method: 'PUT',
    body: {
      message,
      content: encodeContent(path, newContent),
      sha
    }
  });
}

export const deleteRepoFile = async ({ path }) => {

  const url = getUrl(path);
  const { sha } = await getRepoFile({ path });
  await githubJson(url, { 
    method: 'DELETE',
    body: {
      message: `remove ${path} file`,
      sha
    }
  })
}