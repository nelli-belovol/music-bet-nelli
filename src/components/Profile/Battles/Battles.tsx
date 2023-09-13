import { useEffect, useMemo, useState } from 'react';
import { battleAPI, profileAPI } from '../../../api/api';
import { ProfileLayout } from '../../ProfileLayout/ProfileLayout';
import { BattleElement } from './BattleElement';

import styled from './Battles.module.scss';

export interface BattleCustomer {
  track: any;
  customer: any;
  votes: any;
};

export interface BattleElementView {
  id: number;
  status: number;
  step: number;
  date_end: string;
  date_start: string;
  winner: any;
  battle_customers: BattleCustomer[];
};

const useProfileBattles = () => {
  const [userBattles, setBattles] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (userBattles === null) {
      setLoading(true);
      battleAPI.showMyBattle().then((res) => {
        setLoading(false)
        const battles = res.data.data.sort(function(a: any, b: any){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          // @ts-ignore
          return new Date(b.date_start) - new Date(a.date_start);
        });
        setBattles(res.data.data);
      });
    }
  }, [userBattles]);

  const reloadBattles = () => {
    if (userBattles && userBattles.length === 0) {
      battleAPI.showMyBattle().then((res) => {
        setBattles(res.data.data);
      });
    }
  };

  return [userBattles, loading, setBattles, reloadBattles];
};

const Battles = () => {
  const [userBattles, loading, setBattles, reloadBattles] = useProfileBattles();
  const [userInfo, setUserInfo] = useState<any>({});

  useEffect(() => {
    profileAPI
      .getProfile()
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        setUserInfo(res);
      });
  }, []);

  return (
    <ProfileLayout>
      <div className={styled.container}>
        {loading && 
          <h2>Loading ...</h2>
        }
        {userBattles !== null && userBattles.map((battle: BattleElementView) => {
          return (
            <>
              <BattleElement 
                key={battle.id}
                battle={battle}
                userInfo={userInfo}
              />
              <div className={styled.hrBattles} key={`hr_${battle.id}`}></div>
            </>
          );
        })}
      </div>
    </ProfileLayout>
  );
};

export { Battles };
