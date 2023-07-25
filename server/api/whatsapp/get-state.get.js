import { getClient } from '~/server/plugins/1.whatsappClient'


export default eventHandler(async event => {

  try {
    const client = getClient();

    const state = await client.getState();
  
    return {
      state
    };
  } catch (error) {
    
    return {
      state: null
    };
  }

});