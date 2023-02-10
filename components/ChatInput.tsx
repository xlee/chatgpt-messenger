'use client'
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { db} from "../firebase";

type Props = {
	chatId: string; 
}

function ChatInput({chatId}: Props) {

	 const [prompt, setPrompt] = useState('')
	 const { data: session } = useSession();

	//  TODO: useSWR to get model
	const model = "text-davinci-003";

	const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!prompt) return;

		const input = prompt.trim();
		setPrompt("");

		const message: Message = {
			text: input, 
			createdAt: serverTimestamp(),
			user: {
				_id: session?.user?.email!, 
				name: session?.user?.name!, 
				avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`,
			}
		}
		console.log(message);
		await addDoc(collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'), message);

		// TODO: toaster notification to say loading
		const notification = toast.loading("ChatGPT is thinking...")

		await fetch('/api/askQuestion', {
			method: 'POST', 
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				prompt: input, 
				chatId, 
				model, 
				session
			}),
		}).then(() => {
			// TODO: toast notification to say successful
			toast.success("ChatGPT has responded", {
				id: notification, 
			})
		});
	}

  return (
	<div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
		<form onSubmit={e => sendMessage} className="p-5 space-x-5 flex">
			<input 
				value={prompt} type="text"
				className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
				disabled={!session}
				placeholder="Type your message here..."
				onChange={(e) => setPrompt(e.target.value)}
			/>
			<button
				disabled={!prompt || !session} 
				type="submit"
				className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
				>
					
				<PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
			</button>
		</form>

		<div>
			{/* model selection */}
		</div>
	</div>
  )
}

export default ChatInput