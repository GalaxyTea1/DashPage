import { FC } from "react";

const Loading: FC = () => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='three-body'>
        <div className='three-body__dot'></div>
        <div className='three-body__dot'></div>
        <div className='three-body__dot'></div>
      </div>
    </div>
  );
};

export default Loading;

