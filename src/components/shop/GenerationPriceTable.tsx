import React from 'react'

const GenerationPriceTable = () => {
    return (
        <div className="w-full bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4">
            <table className="w-full text-left border-collapse border-separate">
                <tbody>
                    <tr>
                        <td className="px-4 py-2">Text Generation</td>
                        <td className="px-4 py-2">1</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2">Image Generation</td>
                        <td className="px-4 py-2">1</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2">Image Upscaling</td>
                        <td className="px-4 py-2">1</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2">Background Removal</td>
                        <td className="px-4 py-2">1</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2">High Quality Image Generation</td>
                        <td className="px-4 py-2">8</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2">Video Generation</td>
                        <td className="px-4 py-2">30</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default GenerationPriceTable