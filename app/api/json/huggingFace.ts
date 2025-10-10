import { providers } from "./jsons";
import { curProvider } from "./verifyResult";


export default async function huggingFaceApi(data: dataType):Promise<string> {
    const API_KEY = process.env.HUGGING_FACE_AI_API_KEY;

    const response = await fetch(`https://router.huggingface.co/v1/chat/completions`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...data,
            top_p: .1,
            model: providers[curProvider].model,
        }),
        
    });

    // const result = {choices: [{message: {content: "ISSO AQUI É UMA SIMULAÇÃO!"}}]};

    const result = await response.json();
    if (result.choices && result.choices[0]?.message?.content) {
        return result.choices[0].message.content;
    } else {
        console.log(` - ERROR:\n  - ${result.error.split('.')[0]}.`)//summary of error
        return '';
    }
}

type dataType = {
	messages: {
		role: string;
		content: string;
	}[];
	top_p?: number; // 1 no seu exemplo
	model?: string;
};
