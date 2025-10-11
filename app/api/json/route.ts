import { NextRequest } from 'next/server';
import { invalidMsg, responseBase } from './jsons';
import { verifyResult } from './verifyResult';

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const { context, params, jsonlen } = {
		context: searchParams.get('context'),
		params: searchParams.get('params'),
		jsonlen: searchParams.get('jsonlen') || '',
	};
	// console.clear();
	if (context === null || params === null) return new Response(JSON.stringify(invalidMsg, null, 4), responseBase);

	const result = await verifyResult(context, params, jsonlen);

	
	const plainText = `${result}`;

	return new Response(plainText, {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

