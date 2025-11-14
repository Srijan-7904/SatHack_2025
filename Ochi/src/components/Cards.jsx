import React from "react";

const Cards = () => {
  return (
    <div className="w-full h-screen flex gap-5 items-center px-15 -mt-30 -mb-30">
      <div className="card-container h-[700] w-1/2">
        <div className=" relative card w-full h-full rounded-xl flex justify-center items-center">
          <img className="rounded-2xl"
            src="https://i.ibb.co/KcvQtvYp/Gemini-Generated-Image-yumvwtyumvwtyumv.png"
            alt=""
          />
        </div>
      </div>
      <div className="card-container h-[50vh] w-1/2 flex gap-5 items-center justify-center">
        <div className="card w-1/2 h-[43vh] bg-green-900 rounded-xl relative flex items-center justify-center">
          <img className="h-[100%] w-[100%] rounded-2xl"
            src="https://i.ibb.co/FLLqX081/unnamed.jpg"
            alt=""
          />
        </div>
        <div className="card w-1/2 h-[43vh]  bg-green-900 rounded-xl relative items-center justify-center flex">
          <img className="rounded 2xl:"
            src="https://ochi.design/wp-content/uploads/2022/04/logo001.svg"
            alt=""
          />
          <button className="absolute left-6 bottom-6 px-6 py-1 border-2 rounded-full">
            &copy;2025
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
