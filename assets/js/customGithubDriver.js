const { createStorage, defineDriver } = import("unstorage");
const { $fetch } = import("ofetch");
const merge = import('lodash.merge');
const isArray = import('lodash.isarray');
const isPlainObject = import('lodash.isplainobject');

const defaultOptions = {
  repo: "",
  branch: "main",
  ttl: 0,
  base: ""
};

const writeGithubDriver = defineDriver((_opts) => {

  _opts.base = _opts.base.replace(/^\//, "");

  const opts = {
    ...defaultOptions,
    ..._opts,
    getApiUrl: (key) => `https://api.github.com/repos/${opts.repo}/contents/${opts.base}/${key.replace(/:/g, "/").replace(/^\//, "")}?ref=${opts.branch}`,
    getRawUrl: (key) => `https://raw.githubusercontent.com/${opts.repo}/${opts.branch}/${opts.base}/${key.replace(/:/g, "/").replace(/^\//, "")}`
  };

  const verifyOpts = () => {
    if (!opts.repo) {
      throw createError('write-github', "repo option is mandatory");
    }

    if (!opts.base) {
      throw createError('write-github', "base folder option is mandatory");
    }
  };

  const verifyKey = (key) => {
    if (!key) throw createError('write-github', "key is mandatory");
  }

  return {
    name: 'custom-github',
    options: opts,

    async getKeys(key) {
      verifyOpts();
      const url = (key)
        ? opts.getApiUrl(key)
        : `https://api.github.com/repos/${opts.repo}/contents/${opts.base}?ref=${opts.branch}`
      try {
        const files =  await $fetch(url, {
          headers: opts.token ? { Authorization: `token ${opts.token}` } : undefined,
        });
        return files.map(file => file.name)

      } catch (error) {
        throw createError( "write-github", `Failed to get \`${JSON.stringify(key)}\``, { cause: error });
      }
    },

    async hasItem(key) {
      verifyOpts();
      verifyKey();
      try {
        await $fetch(opts.getApiUrl(key), {
          headers: opts.token ? { Authorization: `token ${opts.token}` } : undefined,
        }) 
        return true;
      } catch (error) {
        return false;
      }
    },

    async getItem(key) {
      verifyKey();
      try {
        const response = await $fetch(opts.getRawUrl(key), {
          headers: opts.token ? { Authorization: `token ${opts.token}` } : undefined,
        });
        return parseContent(response);
      } catch (error) {
        throw createError( "write-github", `Failed to get \`${JSON.stringify(key)}\``, { cause: error });
      }
    },

    async getSha(key) {
      verifyKey();
      try {
        const { sha } = await $fetch(opts.getApiUrl(key), {
          headers: opts.token ? { Authorization: `token ${opts.token}` } : undefined,
        });
        return sha;
      } catch (error) {
        throw createError( "write-github", `Failed to get sha for \`${JSON.stringify(key)}\``, { cause: error });
      }
    },

    async setItem(key, value, message) {
      const getRaw = this.getItem(key);
      const getSha = this.getSha(key);
      const [item, sha ] = await Promise.all([getRaw, getSha]);
      value = (sha && isPlainObject(item))
        ? merge(item, value)
        : (sha && isArray(item))
          ? [].concat(item, value)
          : value
      try {
        await $fetch(opts.getApiUrl(key), {
          method: 'PUT',
          headers: opts.token ? { Authorization: `token ${opts.token}` } : undefined,
          body: {
            message: message || (item) ? `update ${key} file`: `add ${key} file`,
            content: encodeContent(value),
            sha
          }
        });
        return value
      } catch (error) {
        throw createError( "write-github", `Failed to set \`${JSON.stringify(key)}\``, { cause: error });
      }
    },
    
    async removeItem(key, message) {
      try {
        const sha = await this.getSha(key);
        await $fetch(opts.getApiUrl(key), {
          method: 'DELETE',
          headers: opts.token ? { Authorization: `token ${opts.token}` } : undefined,
          body: {
            message: message || `remove ${key} file`,
            sha
          }
        });
        return;
      } catch (error) {
        throw createError( "write-github", `Failed to remove \`${JSON.stringify(key)}\``, { cause: error });
      }
    }
  };
});

createStorage({
  driver: writeGithubDriver()
});


const createError = (driver, message, opts) => {
  return new Error(`[unstorage] [${driver}] ${message}`, opts);
}

const encodeContent = (data) => {
  let string;
  try {
    string = JSON.stringify(data, null, 2)
  } catch (error) {
    string = data
  }
  const buff = new Buffer.from(string);
  return buff.toString('base64');
}

const parseContent = (data) => {
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}