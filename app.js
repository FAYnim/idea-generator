import { GoogleGenAI } from "@google/genai";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`;

const ai = new GoogleGenAI({});

async function mulaiProgram() {
		const rl = readline.createInterface({ input, output });
		
		const topik = await rl.question('\nKamu mau bikin ide tentang apa? ');
		
		console.log('Berfikir...\n');
		
		
		try {
			// With Axios
			/*const response = await axios.post(URL, {
				contents: [{
					parts: [{ text: `Berikan 3 ide kreatif dan singkat tentang: ${topik}`}]
				}]
			});
			
			const hasil = response.data.candidates[0].content.parts[0].text;
			console.log('Saran untukmu:\n');
			console.log(hasil);*/
			
			// With GoogleGenAI
			const response = await ai.models.generateContent({
				model: "gemini-2.5-flash",
				contents: `Berikan 3 ide kreatif dan singkat tentang: ${topik}`
			});
			console.log(response.text);
		} catch(error) {
			console.log(error.message);
		}
		
		//console.log('Wah, topik ' + topik + ' itu menarik! Tunggu sebentar ya...');
		
		rl.close();
}

mulaiProgram();