import { ISDKProps } from "./types";

const axiosGenerater = require('@amurse/axios_sdk');

class AmurseChatSDK {
  private token: string;
  private address: string;
  private axiosChat: any;
  private errorHandler?: Function;

  constructor(props: ISDKProps) {
    this.token = props.token;
    this.address = props.address;
    this.axiosChat = axiosGenerater({ dev: !!props.dev }).axiosChat;
    this.errorHandler = props.errorHandler;
  }

  // ensures all fields are initialized for SDK
  validateIntilizations() {
    if (this.token && this.address && this.axiosChat) {
      return true;
    }
    else return false;
  }

  reportError(error: string) {
    this.errorHandler && this.errorHandler(error);
  }

  // always returns a convo; if already doesn't exist, it creates one
  getConversation(convoId: string) {
    if (this.validateIntilizations()) this.reportError('Not initialized');
    // TODO: validate if the receivers have valid addresses
    return this.axiosChat.post('/getConversation',
      {
        convoId,
        token: this.token
      }
    ).then((res: any) => res.data).catch((err: any) => { this.reportError(err) });
  }

  // return a list of conversations that the user is involved with
  getConversations() {
    if (this.validateIntilizations()) return this.reportError('Not initialized');

    return this.axiosChat.post('/getConversations', { address: this.address, token: this.token })
      .then((res: any) => res.data).catch((err: any) => { this.reportError(err) });
  }

  getMessages (convoId: string) {
    if (!convoId) return this.reportError("Invalid Data");
    //session should already by established thorugh fethcing convo
    return this.axiosChat.post('/getMessages', { convoId, token: this.token })
      .then((res: any) => res.data).catch((err: any) => { this.reportError(err) });
  }

  createMessage (convoId: string, text: string){
   // TODO: use web-sockets to implement
  }

  listenMessages(newMessage: Function) {
    // TODO: handle new incoming messages for all user conversations 
  }

  listenConversations(newConversation: Function) {
    // TODO: handle new conversation with current user
  } 
  
}


module.exports = AmurseChatSDK;
