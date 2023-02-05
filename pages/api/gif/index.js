
export default async function handler(req,res){
    // const nameworkout = 'push up'
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5b24ef019cmshcfe0a685bd6d82ep1080aajsn738e33854dc3',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
    };
    fetch('https://exercisedb.p.rapidapi.com/exercises/name/push%20up', options)
	  .then(response => response.json())
	  .then(response => console.log(response))
	  .catch(err => console.error(err));
}
