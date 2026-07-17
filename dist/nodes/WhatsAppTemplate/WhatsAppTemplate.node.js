"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppTemplate = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class WhatsAppTemplate {
    constructor() {
        this.description = {
            displayName: 'Fala.aí Whats: Enviar Template',
            name: 'whatsAppTemplate',
            icon: 'file:whatsapp.png',
            group: ['transform'],
            version: 1,
            subtitle: '={{$parameter["templateName"]}}',
            description: 'Envia mensagem de template WhatsApp via Meta Cloud API (Fala.ai)',
            defaults: {
                name: 'Fala.aí Whats: Enviar Template',
            },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [
                {
                    name: 'whatsAppCloudApi',
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: 'Token Do Canal',
                    name: 'channelToken',
                    type: 'string',
                    typeOptions: { password: true },
                    default: '',
                    required: true,
                    description: 'api_key do canal — campo provider_config.api_key no banco do Chatwoot',
                },
                {
                    displayName: 'Phone Number ID',
                    name: 'phoneNumberId',
                    type: 'string',
                    default: '',
                    required: true,
                    description: 'provider_config.phone_number_id no banco do Chatwoot',
                },
                {
                    displayName: 'Número Do Destinatário',
                    name: 'to',
                    type: 'string',
                    default: '',
                    required: true,
                    placeholder: '5513988661826',
                    description: 'Número do destinatário com DDI, sem + (ex: 5513988661826)',
                },
                {
                    displayName: 'Nome Do Template',
                    name: 'templateName',
                    type: 'string',
                    default: '',
                    required: true,
                    placeholder: 'agendado_ligacao',
                    description: 'Nome exato do template aprovado na Meta',
                },
                {
                    displayName: 'Idioma',
                    name: 'language',
                    type: 'options',
                    options: [
                        { name: 'Português (BR)', value: 'pt_BR' },
                        { name: 'Inglês (US)', value: 'en_US' },
                        { name: 'Espanhol', value: 'es' },
                    ],
                    default: 'pt_BR',
                },
                {
                    displayName: 'Componentes',
                    name: 'components',
                    type: 'fixedCollection',
                    typeOptions: { multipleValues: true },
                    default: {},
                    placeholder: 'Adicionar Componente',
                    options: [
                        {
                            name: 'component',
                            displayName: 'Componente',
                            values: [
                                {
                                    displayName: 'Tipo',
                                    name: 'type',
                                    type: 'options',
                                    options: [
                                        { name: 'Corpo', value: 'body' },
                                        { name: 'Cabeçalho', value: 'header' },
                                        { name: 'Botão', value: 'button' },
                                    ],
                                    default: 'body',
                                },
                                {
                                    displayName: 'Parâmetros',
                                    name: 'parameters',
                                    type: 'fixedCollection',
                                    typeOptions: { multipleValues: true },
                                    default: {},
                                    placeholder: 'Adicionar Parâmetro',
                                    options: [
                                        {
                                            name: 'parameter',
                                            displayName: 'Parâmetro',
                                            values: [
                                                {
                                                    displayName: 'Tipo De Parâmetro',
                                                    name: 'paramType',
                                                    type: 'options',
                                                    options: [
                                                        { name: 'Documento', value: 'document' },
                                                        { name: 'Imagem', value: 'image' },
                                                        { name: 'Localização', value: 'location' },
                                                        { name: 'Texto', value: 'text' },
                                                        { name: 'Vídeo', value: 'video' },
                                                    ],
                                                    default: 'text',
                                                },
                                                {
                                                    displayName: 'Usar Nome Do Parâmetro',
                                                    name: 'useParamName',
                                                    type: 'boolean',
                                                    default: false,
                                                },
                                                {
                                                    displayName: 'Nome Do Parâmetro',
                                                    name: 'paramName',
                                                    type: 'string',
                                                    default: '',
                                                    displayOptions: { show: { useParamName: [true] } },
                                                    description: 'Nome da variável no template (ex: nome, data_av)',
                                                },
                                                {
                                                    displayName: 'Texto',
                                                    name: 'text',
                                                    type: 'string',
                                                    default: '',
                                                    displayOptions: { show: { paramType: ['text'] } },
                                                    description: 'Valor da variável',
                                                },
                                                {
                                                    displayName: 'Link Da Mídia',
                                                    name: 'mediaLink',
                                                    type: 'string',
                                                    default: '',
                                                    placeholder: 'https://exemplo.com/arquivo.jpg',
                                                    displayOptions: { show: { paramType: ['image', 'video', 'document'] } },
                                                    description: 'URL pública e acessível do arquivo (Meta faz o download uma vez ao enviar)',
                                                },
                                                {
                                                    displayName: 'Nome Do Arquivo',
                                                    name: 'filename',
                                                    type: 'string',
                                                    default: '',
                                                    placeholder: 'contrato.pdf',
                                                    displayOptions: { show: { paramType: ['document'] } },
                                                    description: 'Nome do arquivo exibido no WhatsApp (opcional)',
                                                },
                                                {
                                                    displayName: 'Latitude',
                                                    name: 'latitude',
                                                    type: 'string',
                                                    default: '',
                                                    displayOptions: { show: { paramType: ['location'] } },
                                                },
                                                {
                                                    displayName: 'Longitude',
                                                    name: 'longitude',
                                                    type: 'string',
                                                    default: '',
                                                    displayOptions: { show: { paramType: ['location'] } },
                                                },
                                                {
                                                    displayName: 'Nome Do Local',
                                                    name: 'locationName',
                                                    type: 'string',
                                                    default: '',
                                                    displayOptions: { show: { paramType: ['location'] } },
                                                },
                                                {
                                                    displayName: 'Endereço',
                                                    name: 'locationAddress',
                                                    type: 'string',
                                                    default: '',
                                                    displayOptions: { show: { paramType: ['location'] } },
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        };
    }
    async execute() {
        var _a, _b;
        const items = this.getInputData();
        const returnData = [];
        await this.getCredentials('whatsAppCloudApi');
        for (let i = 0; i < items.length; i++) {
            const channelToken = this.getNodeParameter('channelToken', i);
            const phoneNumberId = this.getNodeParameter('phoneNumberId', i);
            const to = this.getNodeParameter('to', i);
            const templateName = this.getNodeParameter('templateName', i);
            const language = this.getNodeParameter('language', i);
            const componentsData = this.getNodeParameter('components', i);
            const components = (componentsData.component || []).map((comp) => {
                var _a;
                const parameters = (((_a = comp.parameters) === null || _a === void 0 ? void 0 : _a.parameter) || []).map((param) => {
                    let p;
                    switch (param.paramType) {
                        case 'image':
                            p = { type: 'image', image: { link: param.mediaLink } };
                            break;
                        case 'video':
                            p = { type: 'video', video: { link: param.mediaLink } };
                            break;
                        case 'document':
                            p = {
                                type: 'document',
                                document: {
                                    link: param.mediaLink,
                                    ...(param.filename ? { filename: param.filename } : {}),
                                },
                            };
                            break;
                        case 'location':
                            p = {
                                type: 'location',
                                location: {
                                    latitude: param.latitude,
                                    longitude: param.longitude,
                                    name: param.locationName,
                                    address: param.locationAddress,
                                },
                            };
                            break;
                        default:
                            p = { type: 'text', text: param.text };
                    }
                    if (param.useParamName && param.paramName) {
                        p.parameter_name = param.paramName;
                    }
                    return p;
                });
                return { type: comp.type, parameters };
            });
            const body = {
                messaging_product: 'whatsapp',
                to: to.replace('+', ''),
                type: 'template',
                template: {
                    name: templateName,
                    language: { code: language },
                    components,
                },
            };
            const response = await this.helpers.request({
                method: 'POST',
                url: `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
                headers: {
                    Authorization: `Bearer ${channelToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
                json: true,
            });
            if (response.error) {
                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Erro ao enviar template: ${response.error.message}`, { itemIndex: i });
            }
            returnData.push({
                json: {
                    sucesso: true,
                    wamid: (_b = (_a = response.messages) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.id,
                    para: to,
                    template: templateName,
                },
                pairedItem: { item: i },
            });
        }
        return [returnData];
    }
}
exports.WhatsAppTemplate = WhatsAppTemplate;
