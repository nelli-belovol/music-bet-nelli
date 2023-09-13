import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { battleAPI, musicAPI } from '../../../api/api';
import iconArrow from '../../../assets/svg/battles/up-arrow.svg';
import { HeaderGeneral } from '../../../components/HeaderGeneral/HeaderGeneral';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { loadMusicCategories, selectCategory } from '../../../store/musicCategoriesSlice';

import styled from './ButtonsPage.module.scss';

interface IProps {
  title: string;
  id?: number;
  handleClick?: any;
}

const mainCategories = [
  // { name: 'all', category_id: null },
  { name: 'mixed', category_id: -1 },
];

// const categories = [
//   { name: 'rock', category_id: 1 },
//   { name: 'pop', category_id: 1 },
//   { name: 'hip hop', category_id: 1 },
//   { name: 'jazz', category_id: 1 },
//   { name: 'rhythm and blues', category_id: 1 },
//   { name: 'country music', category_id: 1 },
//   { name: 'folk music', category_id: 1 },
//   { name: 'blues', category_id: 1 },
//   { name: 'electronic', category_id: 1 },
//   { name: 'classical', category_id: 1 },
//   { name: 'heavy metal', category_id: 1 },
//   { name: 'dance', category_id: 1 },
//   { name: 'punk', category_id: 1 },
//   { name: 'alternative rock', category_id: 1 },
//   { name: 'funk', category_id: 1 },
//   { name: 'latin', category_id: 1 },
//   { name: 'techno', category_id: 1 },
//   { name: 'house', category_id: 1 },
//   { name: 'disco', category_id: 1 },
//   { name: 'instrumental', category_id: 1 },
//   { name: 'soundtrack', category_id: 1 },
//   { name: 'trance', category_id: 1 },
//   { name: 'new-age', category_id: 1 },
// ];

const BigButton: React.FC<IProps> = ({ title, id, handleClick }) => {
  return (
    <button onClick={() => handleClick(id)} className={styled.largeBtn}>
      <span>{title}</span>
    </button>
  );
};

const Button: React.FC<IProps> = ({ title, id, handleClick }) => {
  return (
    <button onClick={() => handleClick(id)} className={styled.btnSmall}>
      <span>{title}</span>
    </button>
  );
};

const ButtonsPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    musicAPI.getCategories().then(categoriesResponse => {
      setCategories(categoriesResponse);
      dispatch(loadMusicCategories(categoriesResponse));
    });
  }, []);
  function redirectToTheFirstRound(id: number | null, name: string): void {
    dispatch(selectCategory({ id, name }));
    navigate(`/battle/all-battles?status=0&category_id=${id}&step=1`);
  }

  // function redirectToTheFirstRound(id: number): void {
  //   battleAPI
  //     .showBattleWithFilter(0, id)
  //     .then((res) => {
  //       //status hardcode 0
  //       //step hardcode 1
  //       navigate(`/battle/all-battles?status=0&category_id=${id}&step=1`);
  //     })
  //     .catch((er) => console.log(er));
  // }

  return (
    <>
      <HeaderGeneral title='NFT Battles' />

      <div className={styled.container}>
        <div className={styled.titleWrapper}>
          <h2>Choose a Genre or Category</h2>
          <img src={iconArrow} alt='icon' />
        </div>

        <div className={styled.buttonsWrapper}>
          {/* bigBtns */}
          <div className={styled.btnLargeWrapper}>
            {mainCategories.map((btn, index) => {
              return (
                <BigButton
                  handleClick={() => redirectToTheFirstRound(btn.category_id, btn.name)}
                  key={index}
                  title={btn.name}
                />
              );
            })}
          </div>
          {/* smallBtns */}
          <div className={styled.btnSmallWrapper}>
            {categories.map((btn, index) => {
              return (
                <Button
                  key={index}
                  handleClick={() => redirectToTheFirstRound(btn.category_id, btn.name)}
                  id={btn.category_id}
                  title={btn.name}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export { ButtonsPage };
