import styled from "./Article.module.scss";

interface IProps {
  article: any;
}

const Article: React.FC<IProps> = ({ article }) => {
  return (
    <>
      <img
        className={styled.image}
        src='https://www.copyright.gov/music-modernization/images/licensing-interactive-streams.jpg'
        alt='img'
        width='216px'
      />
      <div className={styled.content}>
        <h4 className={styled.title}>{article.title}</h4>
        <p className={styled.text}>{article.text}</p>
        <a className={styled.link} href='https://'>
          Read more
        </a>
      </div>
    </>
  );
};

export { Article };
