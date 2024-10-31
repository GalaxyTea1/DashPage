import React, { useEffect, useRef } from "react";
import "./404.css";

function NotFound() {
  const torchRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
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
    <div className='notfound_page'>
      <div className='text'>
        <h1>404</h1>
        <h2>Uh, Ohh</h2>
        <h3>Oh no, we seem to be lost</h3>
      </div>
      <div className='torch' ref={torchRef}></div>
    </div>
  );
}

export default NotFound;
