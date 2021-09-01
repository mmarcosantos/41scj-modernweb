import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Tag from "../../components/Tag";
import { api } from "../../services/api";
import { Container, FormNewPost } from "./styles";

function NewPost() {

    const [categories, setCategories] = useState([]);
    const [categoriesSel, setCategoriesSel] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await api.get("/categories");

                setCategories(response.data);
            } catch (error) {
                console.error(error);
                alert("Ops, erro ao buscar as categorias");
            }
        }

        loadCategories();
    }, []);

    const imageRef = useRef();
    const [image, setImage] = useState(null);

    const handleImage = (e) => {
        if (e.target.files[0]) {
            imageRef.current.src = URL.createObjectURL(e.target.files[0]);
            imageRef.current.style.display = "flex";
        } else {
            imageRef.current.src = "";
            imageRef.current.style.display = "none";
        }

        setImage(e.target.files[0]);
    };

    return (
        <Container>
            <Header />
            <FormNewPost>
                <h1>Nova postagem</h1>
                <Input
                    id="title"
                    label="Título"
                    minLength="5"
                    required
                />
                <Input
                    id="description"
                    label="Descrição"

                    minLength="10"
                    required
                />
                <Input
                    id="gist"
                    label="Gist"
                    minLength="20"

                />
                <Select
                    id="categories"
                    label="Categorias"
                >
                    <option value="">Selecione</option>
                    {categories.map((category) =>
                        <option key={category.id} value={category.id}>
                            {category.description}
                        </option>
                    )}
                </Select>
                <div>
                    {categoriesSel.map(category =>
                        <Tag
                            key={category.id}
                            info={category.description}
                            handleClose={() => { }}
                        ></Tag>
                    )}
                </div>
                <input type="file" accept="image/*" onChange={handleImage} />
                <img alt="Pré-visualização" ref={imageRef} />
                <button>Enviar</button>
            </FormNewPost>
        </Container>
    );
}

export default NewPost;