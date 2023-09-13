import styled from '../NTFBattles.module.scss';

const ExpiresGenresContainer = () => {
  return (
    <div className={styled.bottomContainer}>
      <img
        className={styled.navigateScroll}
        src='image/NTFBattles/SCROLL.svg'
        alt='navigate'
      />
      <div className={styled.options}>
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
          <div className={styled.optionsName}>Expires:</div>
          <div className={styled.optionsValue}>30:00 min</div>
        </div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            marginTop: '5px',
          }}>
          <div className={styled.optionsName}>Genres Battle:</div>
          <div style={{ marginLeft: '14px' }}>Pop vs Rock</div>
        </div>
      </div>
    </div>
  );
};
export { ExpiresGenresContainer };
