import React, { useState } from 'react'
import Loader from '@/components/loaders/Loader'
import SpinningCircleLoader from '@/components/loaders/SpinningCircleLoader';

interface ImageFileProps {
    uri: string | null
}

const ImageFile: React.FC<ImageFileProps> = ({ uri }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [duration, setDuration] = useState(2000);

    const handleToggleLoading = () => {
        setIsLoading(!isLoading);
    };

    const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDuration(Number(event.target.value));
    };

    return (
        <div className={`relative w-96 p-2 h-80 object-contain bg-white bg-opacity-20 hover:bg-opacity-60
                        rounded-2xl cursor-pointer duration-500`}
            onClick={() => window.open(uri || '', '_blank')}
        >
            {
                uri ?
                    (
                        <img src={uri} alt="Image" className="w-full h-full rounded-xl" />
                    ) :
                    (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <SpinningCircleLoader isLoading={isLoading} duration={duration}>
                                <Loader />
                            </SpinningCircleLoader>
                        </div>
                    )
            }
        </div>
    )
}

export default ImageFile