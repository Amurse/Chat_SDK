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

### initializeChatSDK(data)
data: {token, signature}
initializes the SDK for use

### Code Example
```
yarn add '@amurse/chat_sdk';

import {getConversations, initializeChatSDK} from '@amurse/chat_sdk';

const handleError = (err) => {
  console.log(err)
};

initializeChatSDK({token: receiverToken, signature: user.signature});
const data = {address: user.address, signature: user.signature}
let convos = await getConversations(data, handleError);

console.log(convos)
```
# Chat_SDK
