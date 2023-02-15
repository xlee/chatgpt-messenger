import { DocumentData } from "firebase/firestore";
import Typewriter from "typewriter-effect";
import Highlight from "./Highlight";

type Props = { 
	message: DocumentData;
};

function Message({ message } : Props) {

	const isCode = ["{", "}", ";", ":", "="];
	// const isCode = "/{|}|=|;|:|/"

  const isChatGPT = message.user.name === "ChatGPT";
//   console.log('message', message.text);

  return (
	<div className={`py-5 text-white ${isChatGPT && "bg-[#434654]"}`}>

		<div className="flex space-x-5 px-10 max-w-2xl mx-auto">
			<img src={message.user.avatar} alt="https://links.papareact.com/2i6" className="h-8 w-8" />
			<div className="pt-1 text-sm">
				{ isChatGPT && isCode.some(i => message.text.includes(i)) ? 
					<Highlight codeString={message.text.trim()} /> 
					:
					<p className="pt-1 text-sm"> {message.text} </p>

				}

				
			</div>
		</div>
	</div>
  )
}

export default Message


// { isChatGPT ? 
// 	<Typewriter
// 		onInit={(typewriter)=> {
// 		typewriter
// 		.typeString(message.text)
// 		.pauseFor(1000)
// 		.start();
// 	}}
// 	/>
//  :
// <p className="pt-1 text-sm">
// 	{message.text}
// </p>
// }