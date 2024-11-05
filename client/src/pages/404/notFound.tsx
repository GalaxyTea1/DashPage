import { FC, useEffect, useRef } from "react";

const NotFound: FC = () => {
  const torchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (torchRef.current) {
        torchRef.current.style.top = `${event.pageY}px`;
        torchRef.current.style.left = `${event.pageX}px`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className='h-screen bg-cover bg-notFound overflow-hidden flex items-center justify-center flex-col flex-wrap'>
      <div>
        <h1
          className='font-mono font-bold text-[#011718] -mt-[200px] text-[15rem] text-center 
          [text-shadow:-5px_5px_0px_rgba(0,0,0,0.7),-10px_10px_0px_rgba(0,0,0,0.4),-15px_15px_0px_rgba(0,0,0,0.2)]'
        >
          404
        </h1>
        <h2
          className='font-mono font-bold text-black text-8xl text-center -mt-16
          [text-shadow:-5px_5px_0px_rgba(0,0,0,0.7)]'
        >
          Uh, Ohh
        </h2>
        <h3
          className='font-mono font-bold text-white text-3xl ml-8 mt-8
          [text-shadow:-5px_5px_0px_rgba(0,0,0,0.7)]'
        >
          Oh no, we seem to be lost
        </h3>
      </div>
      <div
        ref={torchRef}
        className="fixed w-[240px] h-[240px] -ml-[150px] -mt-[150px] rounded-full opacity-100
          bg-black/30 shadow-[0_0_0_9999em_rgba(0,0,0,0.97)]
          after:content-[''] after:block after:absolute after:top-0 after:left-0 
          after:w-full after:h-full after:rounded-full
          after:shadow-[inset_0_0_100px_2px_#000,0_0_20px_4px_rgba(13,13,10,0.2)]"
      />
    </div>
  );
};

export default NotFound;

