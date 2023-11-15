import React from "react";
import Banner from "./Banner";
import Showing from "./Showing";
import Cinema from "./Cinema";
import Advertise from "./Advertise/Advertise";
import Promotion from "./Promotion/Promotion";

export default function Home() {
  return (
    <div>
      <Banner />
      <Showing />
      <Cinema />
      <Promotion/>
      <Advertise />
    </div>
  );
}
