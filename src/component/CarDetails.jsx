"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarDetails = ({ carDetails }) => {
  const router = useRouter();

  if (!carDetails) {
    return (
      <div className="text-center text-red-500 mt-10">No Car Details Found</div>
    );
  }

  const {
    image,
    make,
    model,
    year,
    price,
    mileage,
    fuelType,
    transmission,
    horsepower,
    engine,
    owners,
    color,
    features,
  } = carDetails;

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      {/* Back Button */}
      <div className="mt-6 mb-4 flex">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-blue-700 text-white hover:bg-blue-800 rounded-md shadow cursor-pointer"
        >
          ← Back
        </button>
      </div>

      {/* Car Images Carousel */}
      <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
        <Carousel
          showArrows={true}
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          autoPlay
          dynamicHeight={false}
          className="rounded-xl"
        >
          {image?.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={`${make} ${model}`}
                className="h-64 object-cover w-full rounded-xl"
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Car Basic Info */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-2">
          {year} {make} {model}
        </h2>
        <p className="text-xl font-semibold text-green-600 mb-2">
          ${price.toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">
          Mileage: {mileage.toLocaleString()} miles
        </p>
      </div>

      {/* Car Specs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm bg-gray-50 rounded-xl p-6 shadow-md mb-6">
        <div>
          <span className="font-semibold">Fuel Type:</span> {fuelType}
        </div>
        <div>
          <span className="font-semibold">Transmission:</span> {transmission}
        </div>
        <div>
          <span className="font-semibold">Horsepower:</span> {horsepower} HP
        </div>
        <div>
          <span className="font-semibold">Engine:</span> {engine}
        </div>
        <div>
          <span className="font-semibold">Owners:</span> {owners}
        </div>
        <div>
          <span className="font-semibold">Color:</span> {color}
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-2">Features:</h3>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {features?.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CarDetails;
