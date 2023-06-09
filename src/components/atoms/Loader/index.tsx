import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

const Loader = () => {
  return (
    <div className="flex justify-center mt-20 h-screen">
      <Player
        autoplay
        loop
        //   style="width: 320px"

        src="https://lottie.host/86053111-758b-47af-bc80-7644331a9700/6olulUZZ2v.json"
        style={{ width: "220px" }}
      >
        <Controls
          visible={false}
          buttons={["play", "repeat", "frame", "debug"]}
        />
      </Player>
    </div>
  );
};

export default Loader;
