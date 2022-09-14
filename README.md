## Chat SDK for Amurse
Different functions to access chat API

#### getConversation(data, errorHandler)
data: {receiverAddress, address, signature}<br/>
returns a conversation or null

#### getConversations(data, errorHandler);
data: {address, signature}<br/>
returns an array of conversations for the given address

#### getMessages(data, errorHandler)
data: {convoId}<br/>
returns an array of messages for conversation

#### createMessage(data, errorHandler);
data: {text, address, convoId, convoIndex}
returns true if message created

### Setting UP
The SDK is a class which exposes the above functions. 
It must be initialized through a constructor requiring 2 things:
1. accessToken 
2. walletSignature

### Code Example
```
yarn add '@amurse/chat_sdk';

import {amurseChatSDK} from '@amurse/chat_sdk';

let chatSDK;

//could be called from other files
export const initializeChatSDK = ({accessToken, walletSignature}) => {
  chatSDK = new amurseChatSDK({accessToken, walletSignature});
}
initializeChatSDK({accessToken: receiverToken, walletSignature: user.signature});

const data = {address: user.address}
let convos = await getConversations(data, handleError);

console.log(convos)
```
# Chat_SDK
