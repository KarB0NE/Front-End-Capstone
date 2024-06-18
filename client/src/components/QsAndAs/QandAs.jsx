import React, {useState} from 'react';
import LightBox from "./LightBox.jsx";

const QandAs = ({q, handleQuestionHelpfulClick, handleAnswerHelpfulClick, handleAddAnswerClick, isModalOpen}) => {
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const [clickedQuestionHelpful, setClickedQuestionHelpful] = useState(false);
  const [clickedAnswerHelpful, setClickedAnswerHelpful] = useState({});

  const toggleAnswers = () => {
    setShowAllAnswers(!showAllAnswers);
  };

  const onQuestionHelpfulClick = () => {
    if (!clickedQuestionHelpful) {
      handleQuestionHelpfulClick(q.question_id);
      setClickedQuestionHelpful(true);
    }
  };

  const onAnswerHelpfulClick = (answerId) => {
    if (!clickedAnswerHelpful[answerId]) {
      handleAnswerHelpfulClick(q.question_id, answerId);
      setClickedAnswerHelpful(prev => ({ ...prev, [answerId]: true }));
    }
  };

  const answerEntries = Object.entries(q.answers);

  var formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
};

  return (
    <>
    <div className="question mb-2">
      <div className="flex flex-row">
    <h3 key={q.question_id} className="font-bold">{`Q: ${q.question_body}`}</h3>
    <span className="ml-auto flex flex-row">Helpful?
      <button className="pl-2 underlineButton underline underline-offset-auto"
        onClick={() => {
        onQuestionHelpfulClick();
      }}
        disabled={clickedQuestionHelpful}
      >
        Yes
        </button>
        <p className="pl-1 pr-2">{`(${q.question_helpfulness})`}</p> |
        <button className="underlineButton pl-2 underline underline-offset-auto"
          onClick={() => handleAddAnswerClick(q.question_id)}
        >
          Add Answer
        </button>
    </span>
    </div>
    </div>

    {answerEntries.length > 0 && (
    <div className="answersList flex flex-row">
      <ul>
      <h3 className="pr-2 font-bold">A: </h3>
      {answerEntries.slice(0, showAllAnswers ? answerEntries.length : 2).map(([answerId, answer]) => (
          <li key={answerId} className="mb-2 ml-4 last:mb-0 odd:bg-slate-200 even:bg-slate-400">
            <p>{answer.body}</p>
          {/* check if photos array length is greater than zero */}
          {/* Lightbox */}
          {answer.photos.length > 0 && (
                <div className="flex flex-row flex-wrap my-2">
                  {answer.photos.map((photo, index) => (
                    <LightBox
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      key={index}
                      hideDownload={true}
                      hideZoom={true}
                    />
                  ))}
                </div>
          )}
          <span className="ml-auto flex flex-row">by {answer.answerer_name}, {formatDate(answer.date)}<p className="px-4"> | </p> <p className="pr-2">Helpful?</p>
            <button
              className="underlineButton underline underline-offset-auto"
              onClick={() => {
                onAnswerHelpfulClick(answerId);
              }}
              disabled={clickedAnswerHelpful[answerId]}
            >
              Yes
            </button>
              <p className="pl-1 pr-4">{`(${answer.helpfulness})`}</p> |
            <button className="underlineButton pl-4 underline underline-offset-auto"> Report</button></span>
          </li>
        ))}
        </ul>
      </div>
    )}

    {answerEntries.length > 2 && (
    <button className="relative m-4 boldButton font-bold" onClick={toggleAnswers}>
      {showAllAnswers ? 'HIDE ANSWERS' : 'LOAD MORE ANSWERS'}
    </button>
    )}

    </>
  );
};

export default QandAs