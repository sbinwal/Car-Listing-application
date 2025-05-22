import React from "react";
import Image from "next/image";
const CarList = ({ item }) => {
  return (
    <div>
      <div className="border border-4 border-black p-2 flex flex-col h-full">
        <Image
          src={item?.image?.[0]}
          alt={item?.make}
          width={300}
          height={200}
          className="w-full h-full transition-transform duration-300 hover:scale-90"
        ></Image>
        <div className="grid justify-items-center text-2xl cursor-pointer text-lg">
        <div className="flex gap-2">
                <div className="font-bold">Brand - </div>
          <div>{item?.make}</div>
          </div>
            <div className="flex gap-2">
                <div className="font-bold">Model - </div>
          <div>{item?.model}</div>
          </div>
          <div className="flex gap-2">
          <div className="font-bold">Price - </div>
          <div>{item?.price}</div>
          </div>
          <div className="flex gap-2">
          <div className="font-bold">Year -</div>
          <div>{item?.year}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarList;
