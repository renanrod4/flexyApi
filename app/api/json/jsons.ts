import huggingFaceApi from './huggingFace';
import openaiApi from './openAI';



export function getPrompt(context: string, params: string, jsonlen: string = '') {
	const data =  {
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
					opcionalmente ele pode querer que um desses parametros seja um array, 
					neste caso você vai retornar um array de strings com o tamanho que voce preferir para este parametro, 
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
					os parametros podem opcionalmente ter tipagens definidas, por exemplo: param1:int

				tamanho desejado de indices que json vai ter INT:
					caso ele não passar você pode colocar a quantidade de elementos que quiser

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
		name:"openrouter.ai",
		model: 'openai/gpt-oss-20b:free',
		callApi:openaiApi
	},
	{
		name:"huggingface.co",
		model: 'openai/gpt-oss-120b:fireworks-ai',
		callApi:huggingFaceApi
	},
];


export const responseBase = {
	status: 400,
	headers: {
		'Content-Type': 'application/json',
	},
};
