import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, doc, getDoc, updateDoc } from '../services/firebase';


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
  const [isModalOpen, setIsModalOpen] = useState(false); // opening/closing modal
  const [modalContent, setModalContent] = useState(null); // For storing the selected content (image/video)
  const [isVideo, setIsVideo] = useState(false);  

  // handle button click and show modal
  const handleButtonClick = (contentUrl, type) => {
    setIsVideo(type === "video"); //see if video
    setModalContent(contentUrl); // set image URL based on button clicked
    setIsModalOpen(true);    // open modal
  };

  // function to close modal
  const closeModal = () => {
    setIsModalOpen(false);   // close modal
    setModalContent(null);       // reset image
  };

  return (
    <div className="col-sm">
      <h3 className="text-center">Hint</h3>
      <div className="p-2 mb-5 bg-light">
        <div className="row">
          <div className="col-6 text-center">
            <p className='blue'>General</p>
            <div className="mb-5 d-grid gap-2">
              <button type="button" className="btn btn-primary mb-1 p-4" onClick={() => handleButtonClick("https://firebasestorage.googleapis.com/v0/b/iwtse-1928f.appspot.com/o/lqvideo%2Fproblem_s.mp4?alt=media&token=03db10c4-1a51-434c-95e0-2cffa95503cf", "video")}>Video</button>
              <button type="button" className="btn btn-primary mb-1 p-4" onClick={() => handleButtonClick("https://firebasestorage.googleapis.com/v0/b/iwtse-1928f.appspot.com/o/lqimages%2Fproblem_s.jpg?alt=media&token=ff5b9997-e374-47b4-ae4b-2b21a9c4666a", "image")}>Summary</button>
            </div>
            <div className="mb-5 d-grid gap-2">
              <button type="button" className="btn btn-primary mb-1 p-4"onClick={() => handleButtonClick("https://firebasestorage.googleapis.com/v0/b/iwtse-1928f.appspot.com/o/lqvideo%2Fmom_s.mp4?alt=media&token=029e8dd9-8991-4b88-af62-bfc6fdb77860", "video")}>Video</button>
              <button type="button" className="btn btn-primary mb-1 p-4"onClick={() => handleButtonClick("https://firebasestorage.googleapis.com/v0/b/iwtse-1928f.appspot.com/o/lqimages%2Fmom_s.jpg?alt=media&token=b5fba6a4-435d-4d42-8f46-ae78f254a597", "image")}>Summary</button>
            </div>
            <div className="mb-5 d-grid gap-2">
            <button type="button" className="btn btn-primary mb-1 p-4"onClick={() => handleButtonClick("https://firebasestorage.googleapis.com/v0/b/iwtse-1928f.appspot.com/o/lqvideo%2Fgravity_s.mp4?alt=media&token=6a9ea4cd-175c-4eaf-a96e-47cc0257d3b9", "video")}>Video</button>
            <button type="button" className="btn btn-primary mb-1 p-4"onClick={() => handleButtonClick("https://firebasestorage.googleapis.com/v0/b/iwtse-1928f.appspot.com/o/lqimages%2Fgravity_s.jpg?alt=media&token=1c1765b8-e25c-45c6-98a9-ef0d3223bc27", "image")}>Summary</button>
            </div>
          </div>
          <div className="col-6 text-center">
            <p className='green'>Problem Specific</p>
            <div className="mb-5 d-grid gap-2">
              <button type="button" className="btn btn-success mb-1 p-4" onClick={() => handleButtonClick("https://firebasestorage.googleapis.com/v0/b/iwtse-1928f.appspot.com/o/lqvideo%2Fspec_strat_balan_s.mp4?alt=media&token=763072a5-9528-4061-ba84-7f139a080b6b", "video")}>Video</button>
              <button type="button" className="btn btn-success mb-1 p-4" onClick={() => handleButtonClick("https://firebasestorage.googleapis.com/v0/b/iwtse-1928f.appspot.com/o/lqimages%2Fspec_strat_balan_s.jpg?alt=media&token=4ba2992b-7f1a-4762-9d9e-db4bf893c4a0", "video")}>Summary</button>
            </div>
            <div className="mb-5 d-grid gap-2">
            <button type="button" className="btn btn-success mb-1 p-4" onClick={() => handleButtonClick("https://firebasestorage.googleapis.com/v0/b/iwtse-1928f.appspot.com/o/lqvideo%2Fspec_mom_s.mp4?alt=media&token=47fee2fb-fe85-467b-becd-82a42769108e", "video")}>Video</button>
            <button type="button" className="btn btn-success mb-1 p-4" onClick={() => handleButtonClick("https://firebasestorage.googleapis.com/v0/b/iwtse-1928f.appspot.com/o/lqimages%2Fspec_mom_s.jpg?alt=media&token=30218676-14e7-4d56-8148-755561d720ac", "video")}>Summary</button>
            </div>
            <div className="mb-5 d-grid gap-2">
            <button type="button" className="btn btn-success mb-1 p-4" onClick={() => handleButtonClick("https://firebasestorage.googleapis.com/v0/b/iwtse-1928f.appspot.com/o/lqvideo%2Fspec_gravity_s.mp4?alt=media&token=a9494804-856b-4ff9-bff7-e03793551449", "video")}>Video</button>
            <button type="button" className="btn btn-success mb-1 p-4" onClick={() => handleButtonClick("https://firebasestorage.googleapis.com/v0/b/iwtse-1928f.appspot.com/o/lqimages%2Fspec_gravity_s.jpg?alt=media&token=f2d9bce3-5dbe-459c-bca0-06c27bd1257d", "video")}>Summary</button>
            </div>
          </div>
        </div>
      </div>


    {/* modal structure */}
    {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            {/* conditional rendering for video or image */}
            {isVideo ? (
              <video controls style={{ maxWidth: '100%' }}>
                <source src={modalContent} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img src={modalContent} alt="Hint" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}


function AnswerComponent({ answerData, correctAnswer, answerCount }) {
  // console.log("Answer Data:", answerData);
  // console.log("Answer Count:", answerCount);
  // console.log("Correct Answer:", correctAnswer);

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);

  const percentageCalculation = (answerCounts) => {
    const totalCount = answerCounts.reduce((total, count) => total + count, 0); //add up total value
    if (totalCount === 0) return answerCounts.map(() => 0); //prevent division by 0
    return answerCounts.map((count) => ((count / totalCount) * 100).toFixed(1)); //work out percentages
  };

  const percentages = percentageCalculation(answerCount); 

  //update the answer count in the db
  const updateAnswerCount = async (selectedIndex) => {
    const docRef = doc(db, "questions", "Nlvl0Fo7nDLJ5dxjImPk");

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const currentCounts = docSnap.data().answer_count || [];
        const updatedCounts = [...currentCounts];
        updatedCounts[selectedIndex] += 1;

        await updateDoc(docRef, { answer_count: updatedCounts });
        console.log("Answer count updated successfully!");
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error updating Firestore:", error);
    }
  };

  const handleAnswerSelect = (answer, index) => {
    setSelectedAnswer(answer);
    setAnswerStatus(null); // reset status when a new answer is selected
    updateAnswerCount(index); // update count for selected answer
  };

  //check the answer
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
          {answerData.map((answer, index) => (
            <div className="col-md-6 d-grid gap-2" key={index}>
              <button
                type="button"
                className={`btn mb-2 p-4 ${ //logic to change btn classes for relevant colour
                  selectedAnswer === answer ? 'btn-secondary' : 'btn-outline-secondary'
                } ${
                  selectedAnswer === answer && answerStatus === 'correct'
                    ? 'btn-success' //green button if selected answer is correct
                    : selectedAnswer === answer && answerStatus === 'wrong'
                    ? 'btn-danger' // red if wrong
                    : ''
                }`}
                onClick={() => handleAnswerSelect(answer, index)} // set selected answer
              >
                {answer} {percentages[index] ? `(${percentages[index]}%)` : null} {/* Display percentage */}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-3">
        <button
          type="button"
          className={`btn p-3 ${
            answerStatus === 'correct'
              ? 'btn-success' // green button if correct
              : answerStatus === 'wrong'
              ? 'btn-danger' // red if wrong
              : 'btn-primary' // blue when no answer is selected
          }`}
          onClick={checkAnswer} // check selected answer
          disabled={selectedAnswer === null} // disable if no answer is selected
        >
          {answerStatus === 'correct'
            ? 'Correct! Well done!'
            : answerStatus === 'wrong'
            ? 'Wrong! Try again.'
            : 'Check My Answer'}
        </button>
        <div className="footerSpace"></div>
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
        const docRef = doc(db, "questions", "Nlvl0Fo7nDLJ5dxjImPk"); // Reference to the Firestore document
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
          answerCount={docData?.answer_count}
        />

      </div>
    </div>
  );
}


export default QuestionPage;
