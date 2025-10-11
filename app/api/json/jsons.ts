import huggingFaceApi from './huggingFace';
import openaiApi from './openAI';

export function getPrompt(context: string, params: string, jsonlen: string = '') {
	const data = {
		messages: [
			{
				role: 'system',
				content: `
				Você é uma API. Gere um JSON com base no conteúdo fornecido pelo usuário. 
				
				Não inclua nenhum texto explicativo, cabeçalhos, comentários ou formatação fora do JSON, como markdown por exemplo;
				voce recebera:

				contexto: 
					geralmente uma string simples, o valor deste contexto vai ser a key do array dos itens do JSON

				parametros[]: 
					Obrigatoriamente separados por + 
					opcionalmente ele pode querer que um desses parametros seja um array ou um objeto, 
					caso array você vai retornar um array de strings com o tamanho que voce preferir para este parametro, 
					um possivel exemplo:
					´´´
						param1:int+param2[subvaloresDeParam:str]+param3+param4[outrosSubvaloresDesteParam]
						
						seu output:
						{
							"param1": "...",
							"param2": [
								"lorem",
								"ipsum"
								...
							],
							"param3": "...",
							"param4": [
								"calabreza",
								"queijo",
								"portuguesa",
							],
						},
					´´´
					caso objeto você vai retornar um objeto com o tamanho que voce preferir para este parametro, 
					um possivel exemplo:
					´´´
						param1:{subparams:content}
						
						seu output:
						{
							"param1":{
								"subParam1":"content of Subparam1"
								"subParam2":"content of Subparam2"
								"subParamN":"...."
							}
						},
					´´´
					os parametros podem opcionalmente ter tipagens definidas, por exemplo: param1:int

				tamanho desejado de indices que json vai ter INT:
					caso ele não passar você pode colocar a quantidade de elementos que quiser

				Ressaltando que o formato é o sempre será o seguinte:
					ojbeto principal
					- Contexto forncido pelo usuario que será um array de tamanho fornecido pelo usuario ou de sua escolha
					 - parametros que serão fornecidos pelo usuario
				
				Antes de finalizar o JSON, **verifique se todas as chaves \`{}\` e colchetes \`[]\` estão balanceados** — nenhuma abertura sem fechamento e nenhum fechamento extra.

				`,
			},
			{
				role: 'user',
				content: `
					contexto(esse vai ser o array principal): ${context}; 
					parametros esperados(keys que o array principal deve ter): ${params}; 
					${jsonlen ? 'tamanho: ' + jsonlen : ''}`,
			},
		],
	};
	return data;
}

export const invalidMsg = {
	invalidInput: {
		status: 400,
		message: 'Invalid input. Please use the following search parameters.',
		details: {
			context: 'The context or main section of the JSON.',
			params: 'parameters that element must include. MUST BE SEPARATED BY +, if some parameter needs to be a object use {id:value} in front of it being the "value" the ',
			optitional: {
				jsonlen: 'Number of elements the json will return',
			},
		},
	},
};
export const providers = [
		{
		name: 'ai.google.dev',
		model: 'gemini-2.5-flash',
		apiKey: process.env.GOOGLE_AI_API_KEY,
		baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai/',
		callApi: openaiApi,
	},
	{
		name: 'openrouter.ai',
		model: 'openai/gpt-oss-20b:free',
		apiKey: process.env.OPEN_ROUTER_API_KEY,
		baseUrl: 'https://openrouter.ai/api/v1',
		callApi: openaiApi,
	},
	{
		name: 'huggingface.co',
		model: 'openai/gpt-oss-120b:fireworks-ai',
		apiKey: process.env.HUGGING_FACE_AI_API_KEY,
		baseUrl: 'https://router.huggingface.co/v1/chat/completions',
		callApi: huggingFaceApi,
	},
];

export const responseBase = {
	status: 400,
	headers: {
		'Content-Type': 'application/json',
	},
};

export type dataType = {
	messages: {
		role: string;
		content: string;
	}[];
	top_p?: number;
	model?: string;
};

export type providerType = {
	name: string;
	model: string;
	apiKey: string|undefined;
	baseUrl: string;
	callApi: (arg0: dataType, arg1: providerType) => Promise<string>;
};

