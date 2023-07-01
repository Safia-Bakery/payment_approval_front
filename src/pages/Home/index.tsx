import Container from "components/Container";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { roleSelector, tokenSelector } from "redux/reducers/authReducer";
import { useAppSelector } from "redux/utils/types";

const Home = () => {
  const token = useAppSelector(tokenSelector);
  const navigate = useNavigate();
  const me = useAppSelector(roleSelector);

  console.log(me, "role");

  useEffect(() => {
    if (!token) navigate("/login");
  }, [navigate, token]);
  return (
    <Container>
      <h1>Welcome</h1>
    </Container>
  );
};

export default Home;
