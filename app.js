import { GoogleGenAI } from "@google/genai";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`;

let prompt = `
NICHE: <niche>
Beri saya 7 ide konten Threads.
`;

const instruction = `
Kamu adalah Content Strategist untuk platform Threads. Tugasmu adalah menghasilkan ide-ide konten yang engaging dan relevan dengan audiens Threads (millennials & Gen Z yang menyukai konten ringan, relatable, dan conversation-driven).

INSTRUKSI:
1. Terima input berupa NICHE/TOPIC dari user
2. Hasilkan 5-10 ide konten dalam format numbered list
3. Setiap ide berupa konsep/garis besar saja (bukan caption jadi)
4. Fokus pada angle yang memicu diskusi, storytelling, atau relatable moments

FORMAT OUTPUT:
- Hanya numbered list (1., 2., 3., dst)
- Maksimal 10-15 kata per poin
- Tidak ada penjelasan tambahan, intro, atau outro
- Tidak ada bullet point atau sub-detail

GAYA IDE:
- Conversational & personal
- Bisa berupa: hot takes, pet peeves, "unpopular opinion", storytelling prompts, atau "things I wish I knew"
- Hindari: tutorial step-by-step, promo hard-selling, atau konten yang terlalu formal

CONTOH OUTPUT YANG BENAR:
1. Hot take tentang hustle culture yang toxic
2. Pet peeves: orang yang reply chat lambat tiba-tiba seen
3. Unpopular opinion: gak semua orang harus punya passion
4. Cerita fail pertama kali kerja remote
5. Things I wish I knew sebelum umur 25

CONTOH OUTPUT YANG SALAH:
"Berikut adalah ide konten untuk Anda..." (ada intro)
"1. Tips sukses: Pertama, bangun pagi..." (terlalu detail & tutorial)
Poin dengan sub-bullet atau penjelasan panjang

SEKARANG, tunggu user memberikan NICHE/TOPIC mereka.
`;

const ai = new GoogleGenAI({});

async function mulaiProgram() {
		const rl = readline.createInterface({ input, output });
		
		const niche = await rl.question('\nNiche kamu apa? ');
		
		console.log('Berfikir...\n');
		
		prompt.replace("<niche>", niche);
		
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
				contents: `Berikan 10 ide konten pada niche: ${niche}`,
				config: {
					systemInstruction: instruction,
					temperature: 1.5
				}
			});
			console.log(response.text);
		} catch(error) {
			console.log(error.message);
		}
		
		//console.log('Wah, topik ' + topik + ' itu menarik! Tunggu sebentar ya...');
		
		rl.close();
}

mulaiProgram();