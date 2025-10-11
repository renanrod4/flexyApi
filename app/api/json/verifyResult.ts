import filterResult from "./filterResult";
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
			
			res = (await providers[curProvider].callApi(data,providers[curProvider])) || '';

			console.log(` - (${res})`)//response for current test api

			if (res) break; // Achou um resultado válido

		} catch {console.log("ERRO NO PROVEDOR: "+providers[curProvider].name)}
		curProvider += 1;
	}
	if (res){
		res = filterResult(res);
		return res;
	}

	return callError;
}
