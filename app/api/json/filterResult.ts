export default function filterResult(result:string):string{
    
    const filteredResult = result.replace("```json",'').replace("```",'')

    return filteredResult;
}