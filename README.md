# n8n-nodes-falaai

Node customizado da Fala.ai para envio de templates WhatsApp via Meta Cloud API.

## Instalação no n8n

1. No n8n, vá em **Settings → Community Nodes → Install**
2. Digite: `n8n-nodes-falaai`
3. Confirme a instalação

## Ou instalação manual (self-hosted)

No container/servidor do n8n:
```bash
npm install -g n8n-nodes-falaai
```
Reinicie o n8n.

## Configuração

### Credencial: WhatsApp Cloud API
- **Access Token**: o `api_key` do canal WhatsApp no Chatwoot (token OAuth do Embedded Signup)
- **Phone Number ID**: o `phone_number_id` do inbox no Chatwoot

### Como pegar as credenciais
Use o workflow "Get Inbox Token" para buscar automaticamente do Chatwoot.

## Uso

No node **WhatsApp Template**:
- **Número de Destino**: número com DDI sem + (ex: `5513988661826`)
- **Nome do Template**: nome exato aprovado na Meta (ex: `agendado_ligacao`)
- **Idioma**: `pt_BR` (padrão)
- **Componentes → Parâmetros**: cada parâmetro tem um **Tipo De Parâmetro**:
  - **Texto**: valor da variável `{{1}}`, `{{2}}`, etc.
  - **Imagem / Vídeo / Documento**: informe **Link Da Mídia** (URL pública — a
    Meta faz o download uma vez ao enviar). Documento aceita também **Nome Do
    Arquivo** (opcional). Normalmente usados no componente **Cabeçalho**,
    seguindo o formato de mídia definido no template aprovado na Meta.
  - **Localização**: latitude, longitude, nome do local e endereço.
  - **Usar Nome Do Parâmetro**: ative para templates com variáveis nomeadas
    (`{{nome}}`) em vez de posicionais (`{{1}}`).
