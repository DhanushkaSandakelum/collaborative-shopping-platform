import React from "react";

import Carousel from "../../components/carousel/Carousel";

import img1 from "../../assets/images/home_shopping_1.jpg";
import img2 from "../../assets/images/home_shopping_2.jpg";
import img3 from "../../assets/images/home_shopping_3.jpg";
import img4 from "../../assets/images/home_shopping_4.jpg";

const data = [
  {
    id: 1,
    name: "IMG1",
    img: img1,
  },
  {
    id: 2,
    name: "IMG2",
    img: img2,
  },
  {
    id: 3,
    name: "IMG3",
    img: img3,
  },
  {
    id: 4,
    name: "IMG4",
    img: img4,
  },
];

function Home() {
  return (
    <div>
      <h1 class="display-6">Collaborative shopping platform</h1>
      <br />
      <Carousel images={data} />
    </div>
  );
}

export default Home;
