import React, { useState } from 'react'
import Loader from '@/components/loaders/Loader'
import SpinningCircleLoader from '@/components/loaders/SpinningCircleLoader';

interface ImageFileProps {
    imgUrl: string | null
}

const ImageFile: React.FC<ImageFileProps> = ({ imgUrl }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [duration, setDuration] = useState(2000);

    const handleToggleLoading = () => {
        setIsLoading(!isLoading);
    };

    const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDuration(Number(event.target.value));
    };

    return (
        <div className={`relative w-96 p-3 ${!imgUrl && "h-80"} object-contain bg-white bg-opacity-15 rounded-xl`}>
            {
                imgUrl ?
                    (
                        <img src={imgUrl} alt="Image" className="w-full h-full" />
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