// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import query from '../../lib/queryApi';
import admin from "firebase-admin";
import { adminDb } from '../../firebaseAdmin';

type Data = {
  answer: string;
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
	const {prompt, chatId, model, session } = req.body; 

	if (!prompt) {
		res.status(400).json({ answer: "Please provide a valid prompt"})
		return; 
	}

	if (!chatId) {
		res.status(400).json({ answer: "Please provide a valid chat ID"})
	}

	// chatgpt query 
	const response = await query(prompt, chatId, model);

	const message: Message = {
		text: response || "ChatGPT was unable to find an answer to that due to high volume",
		createdAt: admin.firestore.Timestamp.now(),
		user: {
			_id: 'ChatGPT', 
			name: 'ChatGPT', 
			avatar: 'https://i.imgur.com/5nRDqAU.jpeg',

		},
	};

	await adminDb
		.collection('users')
		.doc(session?.user?.email)
		.collection('chats')
		.doc(chatId)
		.collection("messages")
		.add(message);

  res.status(200).json({ answer: message.text })
}
