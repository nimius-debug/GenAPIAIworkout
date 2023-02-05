export const excerciseOptions= {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '5b24ef019cmshcfe0a685bd6d82ep1080aajsn738e33854dc3',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };


export const fetchData = async (url, options) =>{
    const response = await fetch(url,options);
    const data = await response.json();
    

    return data;
}