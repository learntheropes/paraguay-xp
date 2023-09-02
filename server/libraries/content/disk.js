import fs from 'fs-extra';
const { pathExists, readJson, writeJson, writeFile, remove } = fs;
import klaw from 'klaw';
import merge from 'lodash.merge';

export const getDiskFile = async ({ path }) => {
  try {
    const exists = await pathExists(path);
    if (exists) {
      const content = await readJson(path);
      return { content };
    }
    else {
      return { content: {}};
    } 
  } catch (error) {
    if (error.code === 'EISDIR') {
      const content = [];
      for await (const file of klaw(path)) {
        if (file.path.includes('.json')){
          const name = file.path.split(path)[1].substring(1);
          content.push({
            name,
            path: path + file.path.split(path)[1]
          });
        }
      }
      return { content };
    }
  }
}

export const addDiskFile = ({ path, content }) => {
  
  writeFile(path, content);
}

export const updateDiskFile = async ({ path, content }) => {

  const { content: oldContent } = await getDiskFile({ path });
  const newContent = merge(oldContent, content);
  await writeJson(path, newContent, {spaces: 2});
}

export const deleteDiskFile = async ({ path }) => {

  await remove(path);
}