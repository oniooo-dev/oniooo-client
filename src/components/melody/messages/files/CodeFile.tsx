import React from 'react'

interface CodeFileProps {
    uri: string;
}

const CodeFile: React.FC<CodeFileProps> = ({ uri }) => {
    return (
        <div>
            <p>CodeFile</p>
        </div>
    )
}

export default CodeFile