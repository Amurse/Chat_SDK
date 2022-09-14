
const validations = require('./components/validations');
const axiosGenerater = require('@amurse/axios_sdk');

let axiosChat;
let token = '';
let signature = ''
const initializeChatSDK = ({accessToken, walletSignature, dev}) => {
  token = accessToken;
  signature = walletSignature;
  let axiosFunctions =  axiosGenerater({dev: !!dev});
  axiosChat  = axiosFunctions.axiosChat;
}

// always returns a convo; if already doesn't exist, it creates one
const getConversation = async (data, errorHandler) => {
  const { receiverAddress, address } = data;
  let validationError = validations.getConversationValidations(data);
  if (validationError) return errorHandler && errorHandler(validationError);

  let conversation = await axiosChat.post('/getConversation',
    {
      addresses: [receiverAddress, address],
      address: address, signature: signature,
      token
    }
  ).catch(err => { errorHandler && errorHandler(err) });
  conversation = conversation.data;
  return conversation;
}

const getConversations = async ({ address }, errorHandler) => {
  if (!address) return errorHandler && errorHandler('Invalid Data');
  return axiosChat.post('/getConversations', { address, signature: signature, token })
    .then(res => res.data).catch(err => { errorHandler && errorHandler(err) });
}

const getMessages = async ({convoId}, errorHandler) => {
  if (!convoId) return errorHandler && errorHandler("Invalid Data");
  //session should already by established thorugh fethcing convo
  return axiosChat.post('/getMessages', { convoId, token, signature })
    .then(res => res.data).catch(err => errorHandler && errorHandler(err));
}

const createMessage = (data, errorHandler) => {
  const { text, address, convoId, convoIndex } = data;
  //session should already be established
  let validationError = validations.createMessageValidations(data);
  if (validationError) return errorHandler && errorHandler(validationError);
  return axiosChat.post('/createMessage',
    { text, address, convoId, convoIndex, token, signature }).then(res => res.data)
    .catch(err => {errorHandler && errorHandler(err)});
}




module.exports = {
  getConversation,
  getConversations,
  getMessages,
  createMessage,
  initializeChatSDK
}
