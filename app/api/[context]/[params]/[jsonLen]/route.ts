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

	return result.choices[0].message.content;
}

type propsType = {
	params: {
		context: string;
		params: string;
		jsonLen: string;
	};
};

export async function GET(req: NextRequest, { params }: propsType) {
	let AIerror = true;
	const { context, params: paramsValue, jsonLen } = await params;
	const data = {
		messages: [
			{
				role: 'system',
				content: `
				Você é uma API. Gere um JSON com base no conteúdo fornecido pelo usuário. 
				Não inclua nenhum texto explicativo, cabeçalhos, comentários ou formatação fora do JSON, como markdown por exemplo.
				`,
			},
			{
				role: 'user',
				content: `assunto: ${context}; parametros esperados: ${paramsValue}; tamanho: ${jsonLen}`,
			},
		],
		top_p: 1,
		model: 'openai/gpt-oss-120b:fireworks-ai',
	};
	while (AIerror) {
		let result = (await huggingFaceApi(data)) || 'Não foi possivel renderizar um json';
		try {
			console.log(JSON.parse(result));
			result = JSON.parse(result);
			result = JSON.stringify(result,null,4);
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
			console.log('!!!! Got an AI error: \n' + error+"\n\n\n\n\n"+result);
			continue;
		}
	}
}
