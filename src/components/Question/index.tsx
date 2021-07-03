import { ReactNode } from 'react';
import cx from 'classnames';

import './styles.scss';

//tipagens de questions
type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode; // [ReactNode]-retorno uma propriadade de button avulva ou dive ou qualquer conteudo.
    isAnswered?: boolean;
    isHightLighted?: boolean;

}

export function Question({
    content, 
    author,
    isAnswered = false,
    isHightLighted = false,
    children,
}: QuestionProps) {
    return ( // transformei em CX - importe(classNames-React) - className={`question ${isAnswered ? 'answered' : ''} ${isHightLighted ? 'highLighted' : ''}`} 
        <div 
          className={cx(
              'question',
              {answered: isAnswered},
              {highLighted: isHightLighted && !isAnswered},
          )}
          >
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                     <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>

        </div>

    );
}
