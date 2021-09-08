import { CardComent, CardPost } from "./styles";
import imgProfile from "../../assets/profile.png"
import { useState } from "react";
import { getUser } from "../../services/security";
import { format } from "date-fns";
import { api } from "../../services/api";

function Post({ data }) {

    let signedUser = getUser();

    console.log(data)

    const [showComents, setShowComents] = useState(false);
    const [comentario, setComentario] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [disabled, setDisabled] = useState();

    const toggleComents = () => setShowComents(!showComents);

    const handleEnviar = async (e) => {
        if (comentario.length < 10) 
        return alert("O comentário deve ter no mínimo 10 caracteres");

    setIsLoading(true);
        try {
            const response = await api.post(`/questions/${data.id}/answers`, {
                description: comentario
            })
           
            let answer = response.data;
            let user = getUser();
            answer.Student = user;
            response.data["created_at"] = response.data.createdAt;
            data.Answers.push(response.data);

            setDisabled(true)
            setComentario("");
           
        } catch (error) {
            console.error(error);
            alert(error);
        } finally{
            setIsLoading(false);
        }
    };
    const handleDisabled = async (e) => {
        setDisabled(e.target.value.length > 9);
        setComentario(e.target.value);
    }
 
    return (
        <CardPost>
            <header>
                <img src={imgProfile} />
                <div>
                    <p>por {signedUser.studentId === data.Student.id ? "você" : data.Student.name}</p>
                    <span>em {format(new Date(data.created_at), "dd/MM/yyyy 'às' HH:mm")}</span>
                </div>
            </header>
            <main>
                <div>
                    <h2>{data.title}</h2>
                    <p>{data.description}</p>
                </div>
                {data.image && <img src={data.image} alt="imagem do post" />}
                <footer>
                    {data.Categories.map(c => <p>{c.description}</p>)}
                </footer>
            </main>
            <footer>
                <h3 onClick={toggleComents}>
                    {
                        data.Answers.length === 0 ?
                            "Seja o primeiro a comentar" :
                            `${data.Answers.length} Comentário${data.Answers.length > 1 && "s"}`
                    }
                </h3>
                {showComents && (
                    <>
                       {data.Answers.map(answer => <Coment data={answer} key={answer.id} />)}
                    </>
                )}
                <div>


                    {isLoading &&
                        <h4>Enviando Comentário...</h4>
                    }

                    {!isLoading &&
                        <div>
                            <form onSubmit={handleEnviar}>
                                <input placeholder="Comente este post" onChange={handleDisabled} />
                                <button disabled={!disabled} >Enviar</button>
                            </form>
                        </div>
                    }

                </div>
            </footer>
        </CardPost>
    );
}

function Coment({data}) {

    return (
        <CardComent>
            <header>
                <img src={data.Student.image} />
                <div>
                    <p>por {data.Student.name}</p>
                    <span>em {format(new Date(data.created_at), "dd/MM/yyyy 'às' HH:mm")}</span>
                </div>
            </header>
            <p>{data.description}</p>
        </CardComent>
    );
}

export default Post;