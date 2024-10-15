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
    const { answerData } = props;
    
      // check answerData is array before mapping
      if (answerData == null) {
        return <p>Error: Answers data is null or undefined!</p>;
      }
    

      return (
        <div className="col-12">
          <h3 className="text-center">Answers</h3>
          <div className="p-3 mb-2 bg-light">
            <div className="row">
              {answerData.map((answer, index) => (
                <div className="col-md-6 d-grid gap-2" key={index}>

                  <button type="button" className="btn btn-secondary mb-2 p-4">
                    {answer}
                  </button>
                </div>
              ))}
            </div>
          </div>
  
              <div className="text-center mt-3">
              <button type="button" className="btn btn-primary p-3">
                Check My Answer
              </button>
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
    }, []);  // Empty dependency array means this effect runs only once when the component mounts

    // If docData is null, show loading message
    if (!docData) {
        return <div className="container"><p>Loading...</p></div>;
    }

    return (
        <div className="container">
            <h1 className="text-center">Question Page</h1>
            <div className="row">
                {/* Pass docData to the QuestionComponent */}
                <QuestionComponent questionData={docData?.question} />

                {/* Pass only hint-related data to HintComponent */}
                <HintComponent hintData={docData?.hint} />
            </div>
            <div className="row">
                {/* Pass possible answers to AnswerComponent */}
                <AnswerComponent answerData={docData?.possible_answers} />

            </div>
        </div>
    );
}


export default QuestionPage;
