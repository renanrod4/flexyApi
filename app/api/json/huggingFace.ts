import { dataType, providers, providerType } from "./jsons";
import { curProvider } from "./verifyResult";


export default async function huggingFaceApi(data: dataType,provider:providerType):Promise<string> {

    const response = await fetch(`${provider.baseUrl}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${provider.apiKey}`,
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
