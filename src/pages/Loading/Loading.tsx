import styled from './Loading.module.scss';

const Loading = () => {
  return (
    <div className={styled.container}>
      <img className={styled.icon} src='./image/loading/loading-icon.svg' alt='icon' />
    </div>
  );
};

export { Loading };
