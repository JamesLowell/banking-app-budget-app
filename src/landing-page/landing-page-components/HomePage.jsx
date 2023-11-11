import React from "react";

const HomePage = () => {
  return (
    <section className="w-full z-0 bg-[#F3F2E8] flex p-32">
      <div className="flex-1">
        <p className="bg-[#F7DAA8] rounded-full border-none w-2/5 pl-4 text-lg font-mulish font-bold">
          20% Discount for 1 Month Account
        </p>
        <h1 className="font-abril text-8xl">
          Manage <span className="text-[#FCB847] leading-normal">Payment</span>{" "}
          Easily for Your Transaction
        </h1>
        <p className="font-mulish text-slate-700 w-3/5 mb-6">
          All in one for you payment transaction online without having to leave
          the house to make transaction
        </p>
        <div className="flex gap-8 mb-6 font-mulish font-bold">
          <button className="rounded-md border-2 border-black p-4 shadow-md shadow-slate-950 hover:shadow-lg hover:shadow-slate-950 hover:bg-[#FCB847]">
            Get Started
          </button>
          <button className="rounded-md border-2 border-black p-4 shadow-md shadow-slate-950 hover:shadow-lg hover:shadow-slate-950 hover:bg-[#FCB847]">
            Consultant
          </button>
        </div>
        <div className="flex mb-6">
          <div className="flex">
            <h2 className="text-5xl font-mulish font-extrabold">18k+</h2>
            <p className="w-1/3  font-mulish">Happy Customer</p>
          </div>
          <div className="flex">
            <h2 className="text-5xl font-mulish font-extrabold">20+</h2>
            <p className="w-1/3  font-mulish">Awards Winning</p>
          </div>
          <div className="flex">
            <h2 className="text-5xl font-mulish font-extrabold">19+</h2>
            <p className="w-1/3  font-mulish">Years of Experience</p>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div>
          <img src="./src/assets/img1.jpg" alt="picture"></img>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
