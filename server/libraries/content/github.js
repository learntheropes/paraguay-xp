import { ofetch } from 'ofetch';
import merge from 'lodash.merge';

const { 
  githubRepo,
  githubToken
 } = useRuntimeConfig();

const encodeContent = (data) => {
  let buff;
  try {
    const string = JSON.stringify(data, null, 2);
    const buff = new Buffer.from(string);
    return buff.toString('base64');
  } catch (error) {
    buff = data
  }
  return buff
}

const githubJson = ofetch.create({
  ignoreResponseError: true,
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `token ${githubToken}`
  }
})

const githubRaw = ofetch.create({
  ignoreResponseError: true,
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3.raw',
    Authorization: `token ${githubToken}`
  }
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

  const url = getUrl(path);
  return await githubJson(url, {
    method: 'PUT',
    body: {
      message,
      content: encodeContent(content)
    }
  });
}

export const updateRepoFile = async ({ path, content, message }) => {

  const url = getUrl(path);
  const { content: oldContent, sha } = await getRepoFile({ path });
  const newContent = merge(oldContent, content);
  console.log('newContent', newContent)
  return await githubJson(url, {
    method: 'PUT',
    body: {
      message,
      content: encodeContent(newContent),
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