import cover from "../../../assets/explore/cover-card.png";
import play from "../../../assets/explore/btn-play.svg";
import stop from "../../../assets/explore/btn-stop.svg";
import note from "../../../assets/explore/note-blue.svg";

import styled from "./CardElement.module.scss";
import { useState } from "react";

const CardElement = () => {
  const [active, setActive] = useState(false);
  return (
    <div className={active ? styled.active : styled.container} onClick={() => setActive(!active)}>
      <figure className={styled.imageWrapper}>
        <img src={cover} alt='cover' />
        <h3>Give in to Me</h3>
        <h4>Micheal Jackson</h4>
        <img className={styled.playerBtn} src={play} alt='play' />
        {/* <img className={styled.playerBtn} src={stop} alt='stop' /> */}
      </figure>
      <div className={styled.hoverContainer}>
        <article>
          <div>
            <h4>Micheal Jackson</h4>
            <h4>Price</h4>
          </div>
          <div>
            <h3>Give in to Me </h3>
            <h3>0.358</h3>
          </div>
        </article>
        <div className={styled.buyNowBlock}>
          <img src={note} alt='note' />
          <p>BUY NOW</p>
        </div>
      </div>
    </div>
  );
};

export { CardElement };
