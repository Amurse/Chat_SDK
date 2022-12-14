"use strict";
var validations = require('./components/validations');
var axiosGenerater = require('@amurse/axios_sdk');
var amurseChatSDK = /** @class */ (function () {
    function amurseChatSDK(props) {
        this.token = props.accessToken;
        this.signature = props.walletSignature;
        this.dev = props.dev;
        this.axiosChat = axiosGenerater({ dev: !!props.dev }).axiosChat;
    }
    // always returns a convo; if already doesn't exist, it creates one
    amurseChatSDK.prototype.getConversation = function (data, errorHandler) {
        var receiverAddress = data.receiverAddress, address = data.address;
        var validationError = validations.getConversationValidations(data);
        if (validationError)
            return errorHandler && errorHandler(validationError);
        return this.axiosChat.post('/getConversation', {
            addresses: [receiverAddress, address],
            address: address, signature: this.signature,
            token: this.token
        }).then(function (res) { return res.data; }).catch(function (err) { errorHandler && errorHandler(err); });
    };
    amurseChatSDK.prototype.getConversations = function (_a, errorHandler) {
        var address = _a.address;
        if (!address)
            return errorHandler && errorHandler('Invalid Data');
        return this.axiosChat.post('/getConversations', { address: address, signature: this.signature, token: this.token })
            .then(function (res) { return res.data; }).catch(function (err) { errorHandler && errorHandler(err); });
    };
    amurseChatSDK.prototype.getMessages = function (_a, errorHandler) {
        var convoId = _a.convoId;
        if (!convoId)
            return errorHandler && errorHandler("Invalid Data");
        //session should already by established thorugh fethcing convo
        return this.axiosChat.post('/getMessages', { convoId: convoId, token: this.token, signature: this.signature })
            .then(function (res) { return res.data; }).catch(function (err) { return errorHandler && errorHandler(err); });
    };
    amurseChatSDK.prototype.createMessage = function (data, errorHandler) {
        var text = data.text, address = data.address, convoId = data.convoId, convoIndex = data.convoIndex;
        //session should already be established
        var validationError = validations.createMessageValidations(data);
        if (validationError)
            return errorHandler && errorHandler(validationError);
        return this.axiosChat.post('/createMessage', { text: text, address: address, convoId: convoId, convoIndex: convoIndex, token: this.token, signature: this.signature }).then(function (res) { return res.data; })
            .catch(function (err) { errorHandler && errorHandler(err); });
    };
    return amurseChatSDK;
}());
module.exports = {
    amurseChatSDK: amurseChatSDK
};
