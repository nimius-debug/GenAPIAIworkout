
import axios from 'axios';
export default async function handler(req, res) {
	const options = {
        method: 'GET',
        url: 'https://exercisedb.p.rapidapi.com/exercises/equipment/body%20weight',
        headers: {
          'X-RapidAPI-Key': process.env.EXERCISE_DB_API_KEY,
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
      };
	try {
		let response = await axios(options);
		res.status(200).json(response.data);
	} catch (error) {
		console.error(error.response.status).send(error.response.data);
	}
}
