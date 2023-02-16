'use client'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import CopyToClipboard from 'react-copy-to-clipboard';
import { useState } from 'react';



type Props = {
	codeString: string, 
}

function Highlight( {codeString} : Props ) {

  const [copied, setCopied] = useState('Copy');
	
  return (
	<div>
		
		<CopyToClipboard text={codeString} onCopy={() => setCopied('Copied')}>
			<div className='flex justify-end space-x-2'>
				<ClipboardIcon className='h-4 w-4' /> 
				<button>{copied}</button>
			</div>
		</CopyToClipboard>

		<SyntaxHighlighter wrapLongLines showLineNumbers={true} language="python" style={atomDark}>
			{codeString}
		</SyntaxHighlighter>

	</div>
  )
}

export default Highlight