import React, { useState, useEffect } from 'react';
import '../../../index.css'

const HeroSection = () => {
    const images = [
        'https://cdn.pixabay.com/photo/2022/08/01/07/59/vegetables-7357585_1280.png',
        'https://phunuvietnam.mediacdn.vn/media/news/566cf8f56fd4d12cc7a11cbb152b1dfa/nong-san-6.png',
        'https://nongsandalatlamdong.vn/Uploads/images/image-20220323112117-2.png'


    ]
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex(prevIndex =>
                (prevIndex + 1) % images.length
            );
        }, 5000);

        return () => clearInterval(intervalId);
    }, [images]);
    return (
        <div className="bg-white font-lora h-[520px]">
            <div className="flex items-center justify-center">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Image ${index + 1}`}
                        className='h-[500px] w-[70%]'
                        style={{ display: index === currentImageIndex ? 'block' : 'none' }}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSection;