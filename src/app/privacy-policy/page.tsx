import React from 'react'

const PrivacyPolicyPage = () => {
    const pdfUrl = 'www.oniooo.com/pdfs/privacy-policy/privacy-policies.pdf';
    return (
        <iframe
            src={pdfUrl}
            title="Full Page PDF"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none'
            }}
        />
    )
}

export default PrivacyPolicyPage