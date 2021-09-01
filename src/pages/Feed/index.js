import { useHistory } from "react-router-dom";
import Header from "../../components/Header";
import Post from "../../components/Post";
import { Container, FaButton } from "./styles";

function Feed() {

    const history = useHistory();

    const handleNavigateToNewPost = () => history.push("/new-post");

    return (
        <Container>
            <Header />
            <Post />
            <FaButton onClick={handleNavigateToNewPost}>+</FaButton>
        </Container>
    );
}

export default Feed;