import styled from "styled-components";
import Image from "next/image";
import CssBaseline from "@material-ui/core/CssBaseline";
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
        <Logo src="/viber-icon.png" width={150} height={150} />
        <Title>Welcome to Viber!</Title>
        <Subtitle>
          Free and secure calls and messages to any Viber user in the world.
        </Subtitle>

        <Button
          variant="contained"
          color="primary"
          style={{
            backgroundColor: "violet",
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
  color: violet;
`;
const Subtitle = styled.h4`
  text-align: center;
  font-weight: 200;
  color: gray;
`;
const Logo = styled(Image)``;
