"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppCloudApi = void 0;
class WhatsAppCloudApi {
    constructor() {
        this.name = 'whatsAppCloudApi';
        this.displayName = 'WhatsApp Cloud API';
        this.documentationUrl = 'https://developers.facebook.com/docs/whatsapp/cloud-api';
        this.properties = [
            {
                displayName: 'Token do App (Meta)',
                name: 'appToken',
                type: 'string',
                typeOptions: { password: true },
                default: '',
                required: true,
                description: 'Token EAAj... do teu app Meta — o mesmo para todos os clientes',
            },
        ];
    }
}
exports.WhatsAppCloudApi = WhatsAppCloudApi;
