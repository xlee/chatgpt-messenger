// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import query from '../../lib/queryApi';
import admin from "firebase-admin";
import { collection } from "firebase/firestore";
import { adminDb } from '../firebaseAdmin';

type Data = {
  answer: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
	const {prompt, chatId, model, session } = req.body; 
	if(!prompt) {
		res.status(400).json({answer: "Please provide a valid chat ID!"})
		return; 
	}

	// chatgpt query 
	const response = await query(prompt, model)

	const message: Message = {
		text: response || "ChatGPT was unable to find an answer to that due to high volume",
		createdAt: admin.firestore.Timestamp.now(),
		user: {
			_id: 'ChatGPT', 
			name: 'ChatGPT', 
			avatar: 'https://links.papareact.com/89k',

		}
	}
	console.log('message', message);

	await adminDb
		.collection('users')
		.doc(session)
		.collection('chats')
		.doc(chatId)
		.collection("messages")
		.add(message);

  res.status(200).json({ answer: message.text })
}
