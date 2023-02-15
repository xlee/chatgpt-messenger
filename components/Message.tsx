import { DocumentData } from "firebase/firestore";
import Typewriter from "typewriter-effect";

type Props = { 
	message: DocumentData;
};

function Message({ message } : Props) {

  const isChatGPT = message.user.name === "ChatGPT";

  return (
	<div className={`py-5 text-white ${isChatGPT && "bg-[#434654]"}`}>

		<div className="flex space-x-5 px-10 max-w-2xl mx-auto">
			<img src={message.user.avatar} alt="https://links.papareact.com/2i6" className="h-8 w-8" />
			<p className="pt-1 text-sm">
				{message.text}
			</p>
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