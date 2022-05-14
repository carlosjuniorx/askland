import logoImg from "../assets/images/logo.svg";
import Button from "../components/Button";
import RoomCode from "../components/RoomCode";
import { useNavigate, useParams } from "react-router-dom";
import checkImg from "../assets/images/check.svg";
import answer from "../assets/images/answer.svg";
import deleteImg from "../assets/images/delete.svg";

import "../styles/room.scss";
import "../styles/question.scss";

import Question from "../components/Question";
import useRoom from "../hooks/useRoom";
import { database } from "../services/firebase";

type Params = {
  id: string;
};

export default function AdminRoom() {
  //const { user } = useAuth();
  const navigate = useNavigate();
  const params = useParams<Params>();
  const idRoom = params.id;
  const { title, questions } = useRoom(idRoom);

  async function handleEndRoom() {
    await database.ref(`rooms/${idRoom}`).update({
      endedAt: new Date(),
    });
    navigate(`/`);
  }

  async function handleDeleQuestion(questionId: string) {
    if (window.confirm("Quer deletar?")) {
      await database.ref(`rooms/${idRoom}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAnswered(questionId: string) {
    await database.ref(`rooms/${idRoom}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighLightQuestion(questionId: string) {
    await database.ref(`rooms/${idRoom}/questions/${questionId}`).update({
      isHighLighted: true,
    });
  }

  return (
    <div className="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="" />
          <div>
            <RoomCode code={idRoom ? idRoom : "000000000000"} />
            <Button isOutLined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        {questions.map((question) => {
          return (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighLighted={question.isHighLighted}
            >
              {!question.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAnswered(question.id)}
                  >
                    <img src={checkImg} alt="Marcar como respondida" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleHighLightQuestion(question.id)}
                  >
                    <img src={answer} alt="Dar destaque" />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => handleDeleQuestion(question.id)}
              >
                <img src={deleteImg} alt="Remover Pergunta" />
              </button>
            </Question>
          );
        })}
      </main>
    </div>
  );
}
