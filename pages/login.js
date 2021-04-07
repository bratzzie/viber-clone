import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { auth, provider } from "../firebase";
const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };
  return (
    <Section maxWidth="sm">
      <Typography
        component="div"
        style={{
          alignItems: "center",
          height: "100vh",
          justifyContent: "center",
        }}
      >
        <Title>Welcome to Viber!</Title>
        <Subtitle>
          Free and secure calls and messages to any Viber user in the world.
        </Subtitle>

        <Button
          variant="contained"
          color="primary"
          style={{
            backgroundColor: "var(--prime)",
            borderRadius: 12,
            marginLeft: "30%",
          }}
          onClick={signIn}
        >
          Log In with Google
        </Button>
      </Typography>
    </Section>
  );
};

export default Login;
const Section = styled(Container)`
  &&& {
    align-items: center;
    justify-content: center;
  }
`;
const Title = styled.h1`
  text-align: center;
  font-weight: 500;
  color: var(--prime);
`;
const Subtitle = styled.h4`
  text-align: center;
  font-weight: 200;
  color: var(--darker_gray);
`;
