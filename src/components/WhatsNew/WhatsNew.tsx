import { Article } from "./Article/Article";
import styled from "./WhatsNew.module.scss";

interface IProps {
  articles: any[];
}

const WhatsNew: React.FC<IProps> = ({ articles }) => {
  return (
    <div className={styled.container}>
      <h3>What's new?</h3>
      <ul className={styled.articlesList}>
        {articles.map((article) => (
          <li className={styled.article} key={article.id}>
            <Article article={article} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { WhatsNew };
