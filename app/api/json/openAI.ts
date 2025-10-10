import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';

export default async function openaiApi(data: dataType) {
	try {
		const openai = new OpenAI({
			baseURL: 'https://openrouter.ai/api/v1',
			apiKey: process.env.OPEN_ROUTER_API_KEY,
		});
		const completion = await openai.chat.completions.create({
			model: 'openai/gpt-oss-20b:free',
			  temperature: 0,
			  top_p: 0.2,
			...(data as { messages: ChatCompletionMessageParam[] }),
		});


		if (completion.choices && completion.choices[0]?.message?.content) {
			return(completion.choices[0].message.content);
		}
	} catch (error) {
		console.log(` - ERROR:\n  - ${error}`); //summary of error
		return '';
	}
}
type dataType = {
	messages: {
		role: string;
		content: string;
	}[];
	top_p?: number; 
	model?: string;
};
