import React from "react";

import Button from "../components/Button";

import { arrowRight } from "../assets/icons";
import { bigShoe1 } from "../assets/images";

const Hero = () => {
  return (
    <section id="home relative" className="">
      <div className="pt-24 px-8">
        <p className="text-lg leading-normal tracking-wider text-red-500 font-medium">
          Our Summer Collection
        </p>
        <h1 className="pt-8 text-6xl font-bold leading-snug">
          <span className="">The New Arrival</span>
          <br />
          <span className="text-red-500 block">Nike</span>
          Shoes
        </h1>
        <p className="text-slate-500 py-4 leading-loose	">
          Discover stylish Nike arrivals, quality comfort, and innovation for
          your active life.
        </p>
        <Button style={{ backgroundColor: "#FF6452", color: "#FFF" }}>
          <span>Shop Now</span>
          <img className="ml-4" src={arrowRight} alt="ar" />
        </Button>

        <div className="flex flex-wrap justify-between mt-16">
          <span className="p-4">
            <h1 className="text-5xl font-semibold">1K+</h1>
            <p className="text-slate-500">Brands</p>
          </span>
          <span className="p-4">
            <h1 className="text-5xl font-semibold">500+</h1>
            <p className="text-slate-500">Shops</p>
          </span>
          <span className="p-4">
            <h1 className="text-5xl font-semibold">250K+</h1>
            <p className="text-slate-500">Customers</p>
          </span>
        </div>
      </div>
      <div className="h-[200px]"
      // className="bg-[url('../assets/images/collection-background.svg')] h-[50vh]"
      >
        <img src="images/collection-background.svg" alt="" />
      </div>
    </section>
  );
};

export default Hero;
