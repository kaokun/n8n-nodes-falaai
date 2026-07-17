import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class WhatsAppCloudApi implements ICredentialType {
	name = 'whatsAppCloudApi';
	displayName = 'WhatsApp Cloud API';
	documentationUrl = 'https://developers.facebook.com/docs/whatsapp/cloud-api';
	properties: INodeProperties[] = [
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
