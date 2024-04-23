import React from 'react';
import Confetti from 'react-confetti';

const CompleteModal = () => {
    const handleReload = () => {
        window.location.reload();
    };

    return (
        <>
            <Confetti className='bg-black bg-opacity-90 w-screen h-screen' />
            <div className='absolute z-30 top-1/4 bg-white bg-opacity-0 px-14 py-16 rounded-xl'>
                <div className='flex flex-col items-center justify-center space-y-2 md:space-y-4'>
                    <h1 className='text-2xl md:text-6xl text-yellow-400 font-black'><i>THAT WAS AMAZING</i></h1>
                    <h1 className='text-xl md:text-3xl text-white font-semibold'><i>Puzzle Completed</i></h1>
                    <span className="underline text-white cursor-pointer" onClick={handleReload}>Press to Restart</span>
                </div>
            </div>
        </>
    );
}

export default CompleteModal;