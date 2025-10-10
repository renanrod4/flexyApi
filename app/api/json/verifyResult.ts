import { getPrompt, providers } from "./jsons";
export let curProvider = 0;

export async function verifyResult(context: string, params: string, jsonlen: string): Promise<string> {
	const callError = 'Ocorreu um erro interno, isso não é culpa sua peço desculpas pelo transtorno';
	let res;

	while (curProvider < providers.length) {
		//run until get some positive response of apis or no one works
		try {
			const data = getPrompt(context, params, jsonlen) ;

			console.log(`${providers[curProvider].name || curProvider}:`);
			
			res = (await providers[curProvider].callApi(data)) || '';

			console.log(` - (${res})`)//response for current test api

			if (res) break; // Achou um resultado válido

		} catch {console.log("ERRO NO PROVEDOR: "+providers[curProvider].name)}
		curProvider += 1;
	}

	return res ? res : callError;
}
