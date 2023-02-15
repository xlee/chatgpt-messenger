'use client'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
	codeString: string, 
}

function Highlight( {codeString} : Props ) {
  return (
	<SyntaxHighlighter wrapLongLines language="python" style={atomDark}>
	{codeString}
  </SyntaxHighlighter>
  )
}

export default Highlight