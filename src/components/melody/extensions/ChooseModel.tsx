import { RootState } from '@/store/store';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

interface ChooseModelProps {
    onClick: (modelName: ModelName) => void;
}

const ChooseModel: React.FC<ChooseModelProps> = ({ onClick }) => {
    const { modelName } = useSelector((state: RootState) => state.melody);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleModelSelect = (modelName: ModelName) => {
        onClick(modelName);
    }

    const handleClick = (modelName: ModelName) => {
        handleModelSelect(modelName);
        toggleDropdown();
    }

    return (
        <div className="flex flex-col gap-2 bg-black bg-opacity-10 p-2 rounded-lg">
            <button
                className="w-full h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl duration-500"
                onClick={toggleDropdown}
            >
                {
                    // The current model
                    modelName === "flash"
                        ?
                        "Gemini Flash 1.5"
                        :
                        "Claude Sonnet 3.5"
                }
            </button>
            {isOpen && (
                <div
                    className="flex items-center justify-center w-full h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl duration-500 cursor-pointer"
                    onClick={
                        // Select the other model
                        () => handleClick(modelName === "flash" ? "claude" : "flash")
                    }
                >
                    {
                        // The other model
                        modelName !== "flash"
                            ?
                            "Gemini Flash 1.5"
                            :
                            "Claude Sonnet 3.5"
                    }
                </div>
            )}
        </div>
    )
}

export default ChooseModel