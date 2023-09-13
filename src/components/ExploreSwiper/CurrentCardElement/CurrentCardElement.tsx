import cover from '../../../assets/explore/cover-card.png';
import play from '../../../assets/explore/btn-play.svg';
import stop from '../../../assets/explore/btn-stop.svg';
import note from '../../../assets/explore/note-blue.svg';

import styled from './CurrentCardElement.module.scss';
import { useMemo } from 'react';
import { BE_BASE_URL } from '../../../api/api';
import { useDispatch } from 'react-redux';
import { setSongData } from '../../../store/playerSlice';

const CurrentCardElement = (track: any) => {
  const dispatch = useDispatch();
  const image = useMemo(() => {
    if (track.track.image) {
      return `${BE_BASE_URL}${track.track.image}`;
    }
    return cover;
  }, [track.track.image]);

  const playSong = () => {
    let lyrics = [];
    try {
      lyrics = JSON.parse(track.track.lyrics.replace(/[\r\n]/g, ''));
    } catch (e) {
      console.log("error lyrics: ", e);
    }
    
    dispatch(
      setSongData({
        id: track.id,
        url: `${BE_BASE_URL}${track.track.file}`,
        image: `${BE_BASE_URL}${track.track.image}`,
        title: track.name,
        singer: track?.track.artists[0]?.name,
        lyrics: lyrics,
        genre:
          track.track.music_categories.length > 0 ? track.track.music_categories[0].name : 'Pop',
      }),
    );
  };
  const openBuyNowLink = (link: Location | (string & Location)) => {
    window.location = link;
  };

  return (
    <div className={styled.container}>
      <figure className={styled.imageWrapper}>
        <img src={image} alt='cover' />
        <h3>{track.track.name ?? "Give in to Me"}</h3>
        <h4>{track?.track?.artists[0]?.name ?? "Micheal Jackson"}</h4>
        <img className={styled.playerBtn} onClick={playSong} src={play} alt='play' />
        {track.track.sold && (
          <div className={styled.soldPlaceholder}>
            SOLD!
          </div>
        )}
        {/* <img className={styled.playerBtn} src={stop} alt='stop' /> */}
      </figure>
      <article>
        <div>
          <h4>{track?.track?.artists[0]?.name ?? "Micheal Jackson"}</h4>
          <h4>Price</h4>
        </div>
        <div>
          <h3>{track.track.name ?? "Give in to Me"}</h3>
          <h3>0.358</h3>
        </div>
      </article>
      <hr />
      <div className={styled.buyNowBlock}>
        <img src={note} alt='note' />
        <p onClick={() => openBuyNowLink(track.track.opensea_link)}>BUY NOW</p>
      </div>
    </div>
  );
};

export { CurrentCardElement };
