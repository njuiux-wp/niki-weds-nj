import React, { useEffect } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import lottieFile from './../assets/json/loader.json';

const Loader = () => {
    return (
        <div className="bg-white w-full h-full">
            <Player
                autoplay
                loop
                controls
                src={lottieFile}
                style={{ width: '300px', height: '300px' }}
            />
        </div>
    );
};

export default Loader;
