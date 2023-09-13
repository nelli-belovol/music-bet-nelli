import { SongBattleElement } from './SongBattleElement';
import path from '../../../assets/battles/path.png';

import styled from './Battles.module.scss';
import { BattleCustomer, BattleElementView } from './Battles';
import { useMemo } from 'react';


interface IProps {
  battle: BattleElementView;
  userInfo: any;
}

const BattleElement: React.FC<IProps> = ({
  battle,
  userInfo
}) => {

  const played = useMemo(() => {
    return battle.status === 1 && battle.winner !== null;
  }, [battle.status]);

  const battleTime = useMemo(() => {
    const usedDate = played ? battle.date_end.replace(" ", "T") : battle.date_start.replace(" ", "T");

    const dateEndDate = new Date(usedDate);
    dateEndDate.setHours(dateEndDate.getHours() + Math.abs(dateEndDate.getTimezoneOffset() / 60));
    
    const displayHours = dateEndDate.getHours() < 10 ? `0${dateEndDate.getHours()}` : dateEndDate.getHours();
    const displayMinutes = dateEndDate.getMinutes() < 10 ? `0${dateEndDate.getMinutes()}` : dateEndDate.getMinutes();
    return `${displayHours}:${displayMinutes}`;
  }, [battle.date_end, battle.date_start, played]);

  const drawBattleCustomers = (battle: BattleElementView) => {
    if (!userInfo || !battle) {
      console.log("userInfo: ", userInfo);
      console.log("battle: ", battle);
      return null;
    }
    let customerId = null;
    if (userInfo && userInfo.customer) {
      customerId = userInfo?.customer.id;
    }
    const isWinner = battle.winner === null ? false : battle.winner.id === customerId;
    
    if (battle.step === 1) {
      return drawStepOneBattle(battle.battle_customers, customerId, isWinner);
    }

    if (battle.step === 2) {
      return drawStepTwoBattle(battle.battle_customers, customerId, isWinner);
    }

    return drawStepThreeBattle(battle.battle_customers, customerId, isWinner);

  }

  const drawStepOneBattle = (battle_customers: BattleCustomer[], customerId: number, isWinner: boolean) => {
    if (battle_customers.length < 2) {
      return;
    }
    return (
      <div className={styled.battleCustomerStepOneContainer}>
        <SongBattleElement votesCount={battle.battle_customers[0].votes.length} isPlayed={played} isOwned={battle.battle_customers[0].customer.id === customerId} isWon={isWinner} track={battle_customers[0].track} customer={battle_customers[0].customer}/>
        <img className={styled.icon} src={path} alt='path' />
        <SongBattleElement votesCount={battle.battle_customers[1].votes.length} isPlayed={played} isOwned={battle.battle_customers[1].customer.id === customerId} isWon={isWinner}track={battle_customers[1].track} customer={battle_customers[1].customer}/>
      </div>
    );
  }

  const drawStepTwoBattle = (battle_customers: BattleCustomer[], customerId: number, isWinner: boolean) => {
    if (battle_customers.length < 4) {
      return;
    }
    return (
      <div>
        <div className={styled.battleCustomerStepOneContainer} style={{ paddingBottom: "10px" }}>
          <SongBattleElement votesCount={battle.battle_customers[0].votes.length} isPlayed={played} isOwned={battle.battle_customers[0].customer.id === customerId} isWon={isWinner} track={battle_customers[0].track} customer={battle_customers[0].customer}/>
          <img className={styled.icon} src={path} alt='path' />
          <SongBattleElement votesCount={battle.battle_customers[1].votes.length} isPlayed={played} isOwned={battle.battle_customers[1].customer.id === customerId} isWon={isWinner} track={battle_customers[1].track} customer={battle_customers[1].customer}/>
          <img className={styled.secondLightning} src={path} alt='path' />
        </div>
        <div className={styled.battleCustomerStepOneContainer}>
          <SongBattleElement votesCount={battle.battle_customers[2].votes.length} isPlayed={played} isOwned={battle.battle_customers[2].customer.id === customerId} isWon={isWinner} track={battle_customers[2].track} customer={battle_customers[2].customer}/>
          <img className={styled.icon} src={path} alt='path' />
          <SongBattleElement votesCount={battle.battle_customers[3].votes.length} isPlayed={played} isOwned={battle.battle_customers[3].customer.id === customerId} isWon={isWinner} track={battle_customers[3].track} customer={battle_customers[3].customer}/>
        </div>
      </div>
    );
  }


  const drawStepThreeBattle = (battle_customers: BattleCustomer[], customerId: number, isWinner: boolean) => {
    if (battle_customers.length < 8){
      return;
    } 
    return (
      <div>
        <div className={styled.battleCustomerStepOneContainer} style={{ paddingBottom: "10px" }}>
          <SongBattleElement votesCount={battle.battle_customers[0].votes.length} isPlayed={played} isOwned={battle.battle_customers[0].customer.id === customerId} isWon={isWinner} track={battle_customers[0].track} customer={battle_customers[0].customer}/>
          <img className={styled.icon} src={path} alt='path' />
          <SongBattleElement votesCount={battle.battle_customers[1].votes.length} isPlayed={played} isOwned={battle.battle_customers[1].customer.id === customerId} isWon={isWinner} track={battle_customers[1].track} customer={battle_customers[1].customer}/>
          <img className={styled.secondLightning} src={path} alt='path' />
        </div>
        <div className={styled.battleCustomerStepOneContainer} style={{ paddingBottom: "10px" }}>
          <SongBattleElement votesCount={battle.battle_customers[2].votes.length} isPlayed={played} isOwned={battle.battle_customers[2].customer.id === customerId} isWon={isWinner} track={battle_customers[2].track} customer={battle_customers[2].customer}/>
          <img className={styled.icon} src={path} alt='path' />
          <SongBattleElement votesCount={battle.battle_customers[3].votes.length} isPlayed={played} isOwned={battle.battle_customers[3].customer.id === customerId} isWon={isWinner} track={battle_customers[3].track} customer={battle_customers[3].customer}/>
          <img className={styled.secondLightning} src={path} alt='path' />
        </div>
        <div className={styled.battleCustomerStepOneContainer} style={{ paddingBottom: "10px" }}>
          <SongBattleElement votesCount={battle.battle_customers[4].votes.length} isPlayed={played} isOwned={battle.battle_customers[4].customer.id === customerId} isWon={isWinner} track={battle_customers[4].track} customer={battle_customers[4].customer}/>
          <img className={styled.icon} src={path} alt='path' />
          <SongBattleElement votesCount={battle.battle_customers[5].votes.length} isPlayed={played} isOwned={battle.battle_customers[5].customer.id === customerId} isWon={isWinner} track={battle_customers[5].track} customer={battle_customers[5].customer}/>
          <img className={styled.secondLightning} src={path} alt='path' />
        </div>
        <div className={styled.battleCustomerStepOneContainer}>
          <SongBattleElement votesCount={battle.battle_customers[6].votes.length} isPlayed={played} isOwned={battle.battle_customers[6].customer.id === customerId} isWon={isWinner} track={battle_customers[6].track} customer={battle_customers[6].customer}/>
          <img className={styled.icon} src={path} alt='path' />
          <SongBattleElement votesCount={battle.battle_customers[7].votes.length} isPlayed={played} isOwned={battle.battle_customers[7].customer.id === customerId} isWon={isWinner} track={battle_customers[7].track} customer={battle_customers[7].customer}/>
        </div>
      </div>
    );
  }

  return (
    <div className={styled.battleWrapper}>
      <div className={styled.time}>
        <p className={styled.text}>{played ? "Played" : "Start at"}</p>
        <p className={styled.currentTime}>{battleTime}</p>
      </div>
      <div className={styled.battleCustomerCOntainer}>
        {drawBattleCustomers(battle)}
      </div>
    </div>
  );
};

export { BattleElement };
