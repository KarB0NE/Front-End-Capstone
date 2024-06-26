import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import QAndAs from './QAndAs.jsx';
import AddQuestionAnswerModal from './AddQuestionAnswerModal.jsx';

const QaList = ({itemQsAndAs, searchTerm, handleQuestionHelpfulClick, handleAnswerHelpfulClick, handleAnswerReport, fetchQuestions}) =>  {
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const { results } = itemQsAndAs;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  const toggleQuestions = () => {
    setShowAllQuestions(!showAllQuestions);
  };

  const filteredQuestions = results.filter(q => {
    const questionBody = q.question_body.toLowerCase();
    return questionBody.includes(searchTerm.toLowerCase());
  });

  const questionsToShow = showAllQuestions ? filteredQuestions : filteredQuestions.slice(0, 4);

  const handleAddClick = ({questionId=null}) => {
    setIsModalOpen(true);
    setSelectedQuestionId(questionId);
  };

  return (
  <>
    <div className="qaList">
    <ul>
     {questionsToShow.map(q => (
          <li key={q.question_id}>
            <QAndAs q={q} handleQuestionHelpfulClick={handleQuestionHelpfulClick} handleAnswerHelpfulClick={handleAnswerHelpfulClick} handleAddAnswerClick={handleAddClick} handleAnswerReport={handleAnswerReport} isModalOpen={isModalOpen} />
          </li>
        ))}
    </ul>
    <span>
    <button className="boxButton m-1 border border-black p-2 bg-white" onClick={toggleQuestions}>
      {showAllQuestions ? 'HIDE QUESTIONS' : 'MORE QUESTIONS'}
    </button>
    <button className="boxButton m-1 border border-black p-2 bg-white" onClick={handleAddClick}> ADD A QUESTION + </button>
    </span>
    {isModalOpen &&
        ReactDOM.createPortal( // Use createPortal to render the modal outside the main app
          <AddQuestionAnswerModal
            isQuestion={selectedQuestionId === null}
            productId={itemQsAndAs.product_id}
            question_id={selectedQuestionId}
            onClose={() => setIsModalOpen(false)}
            fetchQuestions={fetchQuestions}
          />,
          document.getElementById('modal-root') // Target the new modal-root div
        )
      }
    </div>
  </>
  );
  };

  export default QaList;