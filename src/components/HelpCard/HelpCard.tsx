import styled from "./HelpCard.module.scss";

interface IProps {
  card: any;
  setCards?: Function;
}

const HelpCard: React.FC<IProps> = ({ card, setCards }) => {
  const handleClick = () => {
    if (setCards) {
      setCards((prev: any[]) => {
        const newCards = prev.map((prevCard) => {
          if (prevCard.id === card.id) {
            return { ...prevCard, isActive: true };
          } else return prevCard;
        });
        return newCards;
      });
    }
  };

  return (
    <div className={styled.container} onClick={handleClick}>
      <div className={styled.logo}>{card.logo}</div>
      <h3 className={styled.title}>{card.title}</h3>
      <p className={styled.description}>{card.description}</p>
    </div>
  );
};

export { HelpCard };
