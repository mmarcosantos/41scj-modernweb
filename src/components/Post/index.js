import { CardComent, CardPost } from "./styles";
import imgProfile from "../../assets/profile.png"
import { useState } from "react";

function Post() {

    const [showComents, setShowComents] = useState(false);

    const toggleComents = () => setShowComents(!showComents);

    return (
        <CardPost>
            <header>
                <img src={imgProfile} />
                <div>
                    <p>por Fulano de Tal</p>
                    <span>em 10/07/2021 às 13:00</span>
                </div>
            </header>
            <main>
                <div>
                    <h2>Aqui é o título</h2>
                    <p>Aqui é a descrição</p>
                </div>
                <img src="https://marquesfernandes.com/wp-content/uploads/2020/01/1555172.jpg" />
                <footer>
                    <p>Font-end</p>
                    <p>CSS</p>
                    <p>React JS</p>
                </footer>
            </main>
            <footer>
                <h3 onClick={toggleComents}>Comentários</h3>
                {showComents && (
                    <>
                        <Coment />
                        <Coment />
                        <Coment />
                    </>
                )}

                <div>
                    <input placeholder="Comente este post" />
                    <button>Enviar</button>
                </div>
            </footer>
        </CardPost>
    );
}

function Coment() {

    return (
        <CardComent>
            <header>
                <img src={imgProfile} />
                <div>
                    <p>por Ciclano</p>
                    <span>em 10/10/2021 às 13:00</span>
                </div>
            </header>
            <p>Este é o comentário</p>
        </CardComent>
    );
}

export default Post;