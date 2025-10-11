import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';
import { dataType, providerType } from './jsons';

export default async function openaiApi(data: dataType,provider:providerType): Promise<string>{
	try {
		const openai = new OpenAI({
			baseURL: provider.baseUrl,
			apiKey: provider.apiKey,
		});
		const completion = await openai.chat.completions.create({
			model: provider.model,
			reasoning_effort: "medium",

			...(data as { messages: ChatCompletionMessageParam[] }),
		});


		if (completion.choices && completion.choices[0]?.message?.content) {
			return(completion.choices[0].message.content);
		}
	} catch (error) {
		console.log(` - ERROR:\n  - ${error}`); //summary of error
		return '';
	}
	return ''
}
