declare const validations: any;
declare const axiosGenerater: any;
declare class amurseChatSDK {
    constructor(props: any);
    getConversation(data: any, errorHandler: any): any;
    getConversations({ address }: {
        address: any;
    }, errorHandler: any): any;
    getMessages({ convoId }: {
        convoId: any;
    }, errorHandler: any): any;
    createMessage(data: any, errorHandler: any): any;
}
