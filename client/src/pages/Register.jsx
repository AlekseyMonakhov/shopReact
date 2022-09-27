import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { publicRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "85%" })};
`;

const Title = styled.h5`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    confPassword: "",
  });
  const navigate = useNavigate();

  const userHandler = (e) => {
    setNewUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const chekForm = ({ username, email, password, confPassword }) => {
    if (username.length <= 1) {
      return false;
    }
    if (username.includes(" ")) {
      return false;
    }
    if (email.length <= 4) {
      return false;
    }
    if (!email.includes("@")) {
      return false;
    }
    if (!email.includes(".")) {
      return false;
    }
    if (password.length <= 4) {
      return false;
    }
    if (password !== confPassword) {
      return false;
    }
    return true;
  };

  const register = async (e) => {
    try {
      e.preventDefault();
      const res = await publicRequest.post("/auth/register", newUser);
      if (res.status === 201) navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            name='username'
            onChange={userHandler}
            placeholder='name'
          />
          <Input
            name='email'
            onChange={userHandler}
            placeholder='email'
          />
          <Input
            name='password'
            type='password'
            onChange={userHandler}
            placeholder='password'
          />
          <Input
            name='confPassword'
            type='password'
            onChange={userHandler}
            placeholder='confirm password'
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          {chekForm(newUser) ? (
            <Button onClick={register}>CREATE</Button>
          ) : (
            <Button disabled>PLEASE FILL THE FORM</Button>
          )}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
