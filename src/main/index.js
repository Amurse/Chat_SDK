
const validations = require('../components/validations');
const axiosGenerater = require('@amurse/axios_sdk');

class AmurseChatSDK {
  constructor(props) {
    this.token = props.accessToken;
    this.signature = props.walletSignature;
    this.dev = props.dev
    this.axiosChat = axiosGenerater({dev: !!props.dev}).axiosChat;
  }

// always returns a convo; if already doesn't exist, it creates one
  getConversation (data, errorHandler) {
    const { receiverAddress, address } = data;
    let validationError = validations.getConversationValidations(data);
    if (validationError) return errorHandler && errorHandler(validationError);

    return this.axiosChat.post('/getConversation',
      {
        addresses: [receiverAddress, address],
        address: address, signature: this.signature,
        token: this.token
      }
    ).then(res => res.data).catch(err => { errorHandler && errorHandler(err) });
   
  }

  getConversations ({ address }, errorHandler) {
    if (!address) return errorHandler && errorHandler('Invalid Data');
    return this.axiosChat.post('/getConversations', { address, signature: this.signature, token: this.token })
      .then(res => res.data).catch(err => { errorHandler && errorHandler(err) });
  }

  getMessages ({convoId}, errorHandler) {
    if (!convoId) return errorHandler && errorHandler("Invalid Data");
    //session should already by established thorugh fethcing convo
    return this.axiosChat.post('/getMessages', { convoId, token: this.token, signature: this.signature })
      .then(res => res.data).catch(err => errorHandler && errorHandler(err));
  }

  createMessage (data, errorHandler){
    const { text, address, convoId, convoIndex } = data;
    //session should already be established
    let validationError = validations.createMessageValidations(data);
    if (validationError) return errorHandler && errorHandler(validationError);
    return this.axiosChat.post('/createMessage',
      { text, address, convoId, convoIndex, token: this.token, signature: this.signature }).then(res => res.data)
      .catch(err => {errorHandler && errorHandler(err)});
  }
  
}


module.exports = AmurseChatSDK;
