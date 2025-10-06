import { NextRequest } from 'next/server';

const API_KEY = process.env.HUGGING_FACE_AI_API_KEY;

type dataType = {
	messages: {
		role: string;
		content: string;
	}[];
	top_p?: number; // 1 no seu exemplo
	model: string;
};

async function huggingFaceApi(data: dataType) {
	const HF_API_KEY = API_KEY;
	// const model = 'bigscience/bloom'; // ou outro modelo compatível

	const response = await fetch(`https://router.huggingface.co/v1/chat/completions`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${HF_API_KEY}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	const result = await response.json();
	if (result.choices && result.choices[0]?.message?.content) {
		return result.choices[0].message.content;
	} else {
		console.error('Unexpected API response format:', result);
		return JSON.stringify({
			error: 'Unexpected API response format',
			details: result,
		});
	}
}

export async function GET(req: NextRequest) {
	let AIerror = true;
	const invalidMsg = {
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
	const { searchParams } = new URL(req.url);
	const { context, params, jsonlen } = {
		context: searchParams.get('context'),
		params: searchParams.get('params'),
		jsonlen: searchParams.get('jsonlen'),
	};
	if (context === null || params === null)
		return new Response(JSON.stringify(invalidMsg, null, 4), {
			status: 400,
			headers: {
				'Content-Type': 'application/json',
			},
		});

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
		top_p: 1,
		model: 'openai/gpt-oss-120b:fireworks-ai',
	};
	while (AIerror) {
		let result = (await huggingFaceApi(data)) || 'An unexpected error occurred, please try again later!';
		try {
			result = JSON.parse(result);
			if (result?.error == "Unexpected API response format")throw new Error(result)
			console.log(result);
			result = JSON.stringify(result, null, 4);
			// result = JSON.parse(result);
			AIerror = false;

			// result = JSON.stringify(result, null, 2);
			const plainText = `${result}`;
			return new Response(plainText, {
				status: 200,
				headers: {
					'Content-Type': 'application/json',
				},
			});
		} catch (error) {
			console.log('!!!! Got an AI error: \n' + error + '\n\n\n\n\n' + result);
		}
	}
}
