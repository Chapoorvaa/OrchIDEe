import React from 'react';
import Chatbot from './chatbot/Chatbot';
import GitStatus from './git/Git';

export const HomePage: React.FC = () => {
  return (
    <>
      <div className="m-0 grid h-screen w-screen grid-cols-[50px_300px_1fr_300px_50px] grid-rows-[50px_1fr_repeat(2,50px)] gap-2 bg-gray-700">
        <div className="col-span-5">Status bar</div>
        <div className="col-start-1 row-start-2">Tree and Git buttons</div>
        <div className="col-start-2 row-start-2"><GitStatus/></div>
        <div className="col-start-3 row-start-2">Editor</div>
        <div className="col-start-4 row-start-2"><Chatbot/></div>
        <div className="col-start-5 row-start-2">Bot button</div>
        <div className="col-span-5 col-start-1 row-start-3">Terminal</div>
        <div className="col-span-5 row-start-4">Bottom bar</div>
      </div>
    </>
  );
}