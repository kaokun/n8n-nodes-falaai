import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

export class WhatsAppTemplate implements INodeType {
	description: INodeTypeDescription = {
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

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		await this.getCredentials('whatsAppCloudApi');

		for (let i = 0; i < items.length; i++) {
			const channelToken = this.getNodeParameter('channelToken', i) as string;
			const phoneNumberId = this.getNodeParameter('phoneNumberId', i) as string;
			const to = this.getNodeParameter('to', i) as string;
			const templateName = this.getNodeParameter('templateName', i) as string;
			const language = this.getNodeParameter('language', i) as string;
			const componentsData = this.getNodeParameter('components', i) as {
				component?: Array<{ type: string; parameters?: { parameter?: any[] } }>;
			};

			const components = (componentsData.component || []).map((comp) => {
				const parameters = (comp.parameters?.parameter || []).map((param: any) => {
					let p: Record<string, unknown>;

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
				throw new NodeOperationError(
					this.getNode(),
					`Erro ao enviar template: ${response.error.message}`,
					{ itemIndex: i },
				);
			}

			returnData.push({
				json: {
					sucesso: true,
					wamid: response.messages?.[0]?.id,
					para: to,
					template: templateName,
				},
				pairedItem: { item: i },
			});
		}

		return [returnData];
	}
}
