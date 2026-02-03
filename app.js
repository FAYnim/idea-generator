const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');
const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.GEMINI_API_KEY;
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`;

async function mulaiProgram() {
		const rl = readline.createInterface({ input, output });
		
		const topik = await rl.question('\nKamu mau bikin ide tentang apa? ');
		
		console.log('Berfikir...\n');
		
		try {
			const response = await axios.post(URL, {
				contents: [{
					parts: [{ text: `Berikan 3 ide kreatif dan singkat tentang: ${topik}`}]
				}]
			});
			
			const hasil = response.data.candidates[0].content.parts[0].text;
			console.log('Saran untukmu:\n');
			console.log(hasil);
		} catch(error) {
			console.log(error.message);
		}
		
		//console.log('Wah, topik ' + topik + ' itu menarik! Tunggu sebentar ya...');
		
		rl.close();
}

mulaiProgram();