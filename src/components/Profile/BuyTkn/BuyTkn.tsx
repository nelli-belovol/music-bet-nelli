import { useState } from 'react';
import { ProfileLayout } from '../../ProfileLayout/ProfileLayout';
import { CardWrapper } from './CardWrapper';

import visa from '../../../assets/cards/visa.png';
import payPal from '../../../assets/cards/paypal.png';
import maestro from '../../../assets/cards/maestro.png';
import americanExpress from '../../../assets/cards/american-express.png';
import applePay from '../../../assets/cards/apple-pay.png';
import check from '../../../assets/check.png';
import pin from '../../../assets/pin.svg';

import styled from './BuyTkn.module.scss';
import { tokenAPI } from '../../../api/api';

interface IValues {
  paymentMethod?: 'visa' | 'paypal' | 'maestro' | 'american-express' | 'apple-pay';
  username?: string;
  cardNumber?: string;
  date?: string;
  ccv?: string;
  amount?: string;
}

const initialValues = {
  paymentMethod: 'visa',
  username: '',
  cardNumber: '',
  date: '',
  ccv: '',
  amount: '100',
};

const dataButtons = [
  // { url: visa, id: 0, paymentMethod: 'visa' },
  { url: payPal, id: 1, paymentMethod: 'paypal' },
  // { url: maestro, id: 2, paymentMethod: 'maestro' },
  // { url: americanExpress, id: 3, paymentMethod: 'american-express' },
  // { url: applePay, id: 4, paymentMethod: 'apple-pay' },
];

const dataTknBtns = [
  { title: '100 TKN', amount: '100' },
  { title: '200 TKN', amount: '200' },
  { title: '300 TKN', amount: '300' },
  { title: '400 TKN', amount: '400' },
  { title: '500 TKN', amount: '500' },
  { title: '600 TKN', amount: '600' },
  { title: '700 TKN', amount: '700' },
  { title: '800 TKN', amount: '800' },
  { title: '900 TKN', amount: '900' },
];

const BuyTkn = () => {
  const [data, setData] = useState(initialValues);
  const [currentPayBtn, setCurrentBtn] = useState(0);
  const [currentTkmAmountBtn, setCurrentTkmAmountBtn] = useState(0);
  const [toggleSavePayment, setToggleSavePayment] = useState(false);

  function payment() {
    tokenAPI.getPaypal(data.amount).then((res) => {
      window.location.href = res.data.redirect_url;
      console.log(res);
    });
  }

  function currentPaymentMethod(index: number) {
    setData({ ...data, paymentMethod: dataButtons[index].paymentMethod });
    setCurrentBtn(index);
  }

  function currentTknAmount(index: number) {
    setData({ ...data, amount: dataTknBtns[index].amount });
    setCurrentTkmAmountBtn(index);
  }

  return (
    <ProfileLayout>
      <div className={styled.container}>
        <CardWrapper title='1) Payment method'>
          <div className={styled.wrap}>
            <div className={styled.buttonWrapper}>
              {dataButtons.map((btn, index: number) => {
                return (
                  <button
                    key={index}
                    onClick={() => currentPaymentMethod(index)}
                    className={
                      index === currentPayBtn ? styled.cardButtonActive : styled.cardButton
                    }>
                    {index === currentPayBtn && (
                      <img className={styled.check} src={check} alt='checked' />
                    )}
                    <img className={styled.imageCard} src={btn.url} alt='' />
                  </button>
                );
              })}
            </div>
          </div>
        </CardWrapper>
        <CardWrapper title='2) Select or enter the desired amount'>
          <div className={styled.wrapperSecondCard}>
            <div className={styled.tknBtnWrapper}>
              {dataTknBtns.map((el, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => currentTknAmount(index)}
                    className={
                      index === currentTkmAmountBtn ? styled.tknBtnActive : styled.tknBtn
                    }>
                    {index === currentTkmAmountBtn && (
                      <img className={styled.checkTkn} src={check} alt='checked' />
                    )}
                    {el.title}
                  </button>
                );
              })}
            </div>

            <div className={`${styled.wrapperField} ${styled.cardholderName}`}>
              <label className={styled.label} htmlFor='amount'>
                Amount
              </label>
              <input
                value={data.amount}
                onChange={(e) => setData({ ...data, amount: e.target.value })}
                className={`${styled.input} ${styled.amountInput}`}
                id='amount'
                name='amount'
                placeholder='TKN'
              />
            </div>
            <button onClick={() => payment()} className={styled.btnConfirm}>
              <span>Confirm Payment</span>
            </button>
          </div>
        </CardWrapper>
      </div>
    </ProfileLayout>
  );
};

export { BuyTkn };
