import { 
  getRepoFile, 
  addRepoFile, 
  updateRepoFile, 
  deleteRepoFile 
} from '~/server/libraries/content/github';
import { 
  getDiskFile, 
  addDiskFile, 
  updateDiskFile, 
  deleteDiskFile 
} from '~/server/libraries/content/disk';

const {
  public: {
    isDeployed
  }
} = useRuntimeConfig();

export const getFile = async ({ path }) => {

  if (isDeployed) return await getRepoFile({ path });
  else return await getDiskFile({ path });
}

export const addFile = async ({ path, content, message }) => {

  if (isDeployed) return await addRepoFile ({ path, content, message });
  else return await addDiskFile({ path, content });
}

export const updateFile = async ({ path, content, message }) => {

  if (isDeployed) return await updateRepoFile({ path, content, message });
  else return await updateDiskFile({ path, content });
}

export const deleteFile = async ({ path }) => {

  if (isDeployed) return await deleteRepoFile({ path });
  else return await deleteDiskFile({ path });
}