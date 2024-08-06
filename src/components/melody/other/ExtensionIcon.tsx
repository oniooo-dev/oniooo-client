import React from 'react'

interface ExtensionIconProps {
    label: string
}

const ExtensionIcon: React.FC<ExtensionIconProps> = ({ label }) => {
  return (
    <div className="rounded-lg p-1 bg-gray-100 cursor-pointer">
      <p className="text-black">{label}</p>
    </div>
  )
}

export default ExtensionIcon
