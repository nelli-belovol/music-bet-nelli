import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setSongGenre, setSongId, setSongImage, setSongSinger, setSongSubs, setSongTitle, setSongUrl } from "../../store/playerSlice";
import { battleAPI, BE_BASE_URL } from '../../api/api';
import play from '../../assets/explore/btn-play.svg';
import stop from '../../assets/explore/btn-stop.svg';

import { ISong } from '../Profile/NFTSongs/NFTSong';
import { ModalNFT } from './ModalNFT';

import styled from './NFTSongs.module.scss';

interface IProps extends ISong {
  index: number;
}

interface MusicCategory {
  id: string;
  name: string;
}
const NFTSongs: React.FC<IProps> = (props) => {
  const dispatch = useAppDispatch();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(true);
  const [isMixed, setIsMixed] = useState<number>(0);
  const [inBattle, setInBattle] = useState<boolean>(false);
  const [myBattles, setMyBattles] = useState<any>([]);
  const [songsInBattle, setSongsInBattle] = useState<any>([]);

  useEffect(() => {
    if (props.track) {
      setInBattle(props.track.in_battle === 1)
    }

    battleAPI.showMyBattle().then(res => {
      const songsInBattleNew = [];
      res.data.data.map((battle: { status: number; battle_customers: any[] }) => {
          battle.battle_customers.map((bc: {track_id: number;}) => {
            if (bc.track_id === props.track_id) {
              setInBattle(true);
            }
            songsInBattleNew.push(bc.track_id);
          });
      });
    });
  }, [props.track]);

  const { index, id, track_id } = props;

  useEffect(() => {
    // setInBattle(false);
    // songsInBattle.map((sib: number) => {
    //   if (sib === track_id) {
    //     setInBattle(true);
    //   }
    // });
  }, [track_id, songsInBattle])
  const { name, image, label } = props.track;

  const songImage = `${BE_BASE_URL}${props.track.image}`;
  function toggleOpenModal() {
    setModalIsOpen((prev) => !prev);
  }

  function addTrackToBattle(id: number, is_mixed: number) {
    if (inBattle) {
      return;
    }
    battleAPI
      .addTrackToBattle(id, is_mixed)
      .then((res) => {
        setModalIsOpen(false);
        setInBattle(true);
      })
      .catch((error) => console.log(error));
  }

  const handlePlay = () => {
    dispatch(setSongId(props.track.id));
    dispatch(setSongGenre((props.track.music_categories.length > 0) ? props.track.music_categories[0].name : "Pop"));
    dispatch(setSongUrl(`${BE_BASE_URL}${props.track.file}`));
    dispatch(setSongImage(`${BE_BASE_URL}${props.track.image}`));
    dispatch(setSongTitle(props.track.name));
    dispatch(setSongSinger(props.track?.artists[0]?.name));
    dispatch(setSongSubs(JSON.parse(props.track.lyrics.replace(/[\r\n]/g, ""))));
    setModalIsOpen(!modalIsOpen);
  }

  return (
    <div className={styled.container}>
      {/* order/play */}
      <div className={styled.orderPlay}>
        <p className={styled.order}>#{index + 1}</p>
      </div>

      {/* img */}
      <div style={{ position: "relative", }}>
        <img className={styled.playerBtn} style={{ position: "absolute", left: "15px", top: "15px", height: "30px"}} onClick={handlePlay} src={play} alt='play' />
        <img className={styled.image} src={songImage} alt='nft_logo' />
      </div>

      {/* title */}
      <div className={styled.titleWrapper}>
        <p className={styled.title}>{name}</p>
        <p className={styled.artist}>{label}</p>
      </div>

      {/* points */}
      <div className={styled.pointsWrapper}>
        <img className={styled.shape} src='image/yourNft/shape.svg' alt='shape' />
        <p className={styled.points}>{props.track.win_count} points</p>
      </div>

      {/* star-wrapper */}
      <div className={styled.starWrapper}>
        <img className={styled.star} src='image/yourNft/star.svg' alt='' />
        <p className={styled.count}>0</p>
      </div>

      {/* menu1 */}
      <div>
        {inBattle ? (
          <div style={{ paddingRight: "20px"}}>In battle</div>
        ): (  
          <select className={styled.menuMixed} onChange={(event) => { setIsMixed(event.target.value === '-1' ? 1 : 0); }}>
            <option value='-1' defaultValue='MIXED'>
              MIXED
            </option>
            {props.track.music_categories && props.track.music_categories.map((musicCategory: MusicCategory) => {

              return (<option value={musicCategory.id} key={musicCategory.id}>{musicCategory.name}</option>);
            })}
          </select>
        )}
        
      </div>

      {!inBattle &&
        <div>
          <button onClick={() => addTrackToBattle(track_id, isMixed)} className={styled.goToBattleButton}>{inBattle ? "In battle" : "Go to battle"}</button>
        </div>  
      }

      

      {/* menu2 */}
      {/* <div className={styled.battleBtn}>upcoming 20:00</div> */}

      {/* menu3 */}
      
    </div>
  );
};

export { NFTSongs };
