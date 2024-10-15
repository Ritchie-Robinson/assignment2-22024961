import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, doc, getDoc } from '../services/firebase';


const SignOutButton = () => {
    const navigate = useNavigate();  // initialise navigate

    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                console.log('User signed out');
                navigate('/');  // redirect to  LoginPage after sign out
            })
            .catch((error) => {
                console.error('Error signing out:', error.message);
            });
    };

    return (
        <button onClick={handleSignOut} className="btn btn-danger">
            Sign Out
        </button>
    );
};


function QuestionComponent({ questionData }) {

    return (

        <div className="col-sm">
            <SignOutButton />
            <h3 className="text-center">Question</h3>
            <div className="p-2 mb-5 bg-light">
                <div className="text-center">
                    <img className="mb-4 rounded img-fluid" src="https://firebasestorage.googleapis.com/v0/b/iwtse-1928f.appspot.com/o/balances.png?alt=media&token=dd2d8d20-7257-4ec2-985a-33dd38939e9b" alt="question" />
                </div>
                <p>{questionData || "Loading question..."}</p>
            </div>
        </div>
    )

}

function HintComponent() {

    return (
        <div className="col-sm">
            <h3 className="text-center">Hint</h3>
            <div className="p-2 mb-5 bg-light">
                <div className="row">
                    <div className="col-6 text-center">
                        <p>General</p>
                        <div className="mb-5 d-grid gap-2">
                            <button type="button" className="btn btn-primary mb-1 p-4">Primary</button>
                            <button type="button" className="btn btn-primary mb-1 p-4">Primary</button>
                        </div>
                        <div className="mb-5 d-grid gap-2">
                            <button type="button" className="btn btn-primary mb-1 p-4">Primary</button>
                            <button type="button" className="btn btn-primary mb-1 p-4">Primary</button>
                        </div>
                        <div className="mb-5 d-grid gap-2">
                            <button type="button" className="btn btn-primary mb-1 p-4">Primary</button>
                            <button type="button" className="btn btn-primary mb-1 p-4">Primary</button>
                        </div>
                    </div>
                    <div className="col-6 text-center">
                        <p>General</p>
                        <div className="mb-5 d-grid gap-2">
                            <button type="button" className="btn btn-success mb-1 p-4">Success</button>
                            <button type="button" className="btn btn-success mb-1 p-4">Success</button>
                        </div>
                        <div className="mb-5 d-grid gap-2">
                            <button type="button" className="btn btn-success mb-1 p-4">Success</button>
                            <button type="button" className="btn btn-success mb-1 p-4">Success</button>
                        </div>
                        <div className="mb-5 d-grid gap-2">
                            <button type="button" className="btn btn-success mb-1 p-4">Success</button>
                            <button type="button" className="btn btn-success mb-1 p-4">Success</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

function AnswerComponent(props) {
    const { answerData, correctAnswer } = props;  // get answerData and correctAnswer

    // state to keep track of selected answer and button's state
    const [selectedAnswer, setSelectedAnswer] = useState(null); // for tracking selected answer
    const [answerStatus, setAnswerStatus] = useState(null);  // track if answer is correct or wrong
    
      // check answerData is array before mapping
      if (answerData == null) {
        return <p>Error: Answers data is null or undefined!</p>;
      }
  // handle selecting an answer
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);  // set  selected answer in state
    setAnswerStatus(null);  // reset status when a new answer is selected
  };

  // Handle checking the selected answer
  const checkAnswer = () => {
    if (selectedAnswer === correctAnswer) {
      setAnswerStatus('correct');
    } else {
      setAnswerStatus('wrong');
    }
  };

  return (
    <div className="col-12">
      <h3 className="text-center">Answers</h3>
      <div className="p-3 mb-2 bg-light">
        <div className="row">
          {/* possible answer buttons */}
          {answerData.map((answer, index) => (
            <div className="col-md-6 d-grid gap-2" key={index}>
              <button
                type="button"
                className={`btn mb-2 p-4 ${
                  // Apply grey for the selected answer
                  selectedAnswer === answer
                    ? 'btn-secondary'  // grey button for selected answer
                    : 'btn-outline-secondary'  // default state for non-selected answers
                } ${
                  // apply correct or wrong color only to selected button
                  selectedAnswer === answer && answerStatus === 'correct'
                    ? 'btn-success'  //green button if selected answer is correct
                    : selectedAnswer === answer && answerStatus === 'wrong'
                    ? 'btn-danger'   // red if wrong
                    : ''
                }`}
                onClick={() => handleAnswerSelect(answer)}  // set selected answer
              >
                {answer}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* check My Answer button */}
      <div className="text-center mt-3">
        <button
          type="button"
          className={`btn p-3 ${
            answerStatus === 'correct'
              ? 'btn-success'  // Ggeen button if correct
              : answerStatus === 'wrong'
              ? 'btn-danger'   // red if wrong
              : 'btn-primary'  // blue when no answer selected
          }`}
          onClick={checkAnswer}  // check selected answer
          disabled={selectedAnswer === null}  // disable if no answer is selected
        >
          {answerStatus === 'correct'
            ? 'Correct! Well done!'
            : answerStatus === 'wrong'
            ? 'Wrong! Try again.'
            : 'Check My Answer'}
        </button>
        <div className='footerSpace'></div>
      </div>
    </div>
  );
}

// main question component
function QuestionPage() {
    const [docData, setDocData] = useState(null);  // State to store question data

    // Fetching data from Firestore
    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, "questions", "Nlvl0Fo7nDLJ5dxjImPk");  // Reference to the Firestore document
                const docData = await getDoc(docRef);  // Fetch the document
                if (docData.exists()) {
                    setDocData(docData.data());  // Set the question data in state
                    console.log(docData.data());
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching data from Firestore:", error);
            }
        };

        fetchData();
    }, []);  // empty dependency array means effect runs only once when the component mounts

    // if docData is null, show loading message
    if (!docData) {
        return <div className="container"><p>Loading...</p></div>;
    }

    return (
        <div className="container">
            <h1 className="text-center">{docData?.title}</h1>
            <div className="row">
                {/* pass docData to QuestionComponent */}
                <QuestionComponent questionData={docData?.question} />

                {/* pass hint data to HintComponent */}
                <HintComponent hintData={docData?.hint} />
            </div>
            <div className="row">
                {/* pass possible answers and correct answer to AnswerComponent */}
                <AnswerComponent 
                    answerData={docData?.possible_answers}  
                    correctAnswer={docData?.correct_answer} 
                    />

            </div>
        </div>
    );
}


export default QuestionPage;
