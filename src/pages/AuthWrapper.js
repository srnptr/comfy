import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { Loading, Error } from "../layouts";

const AuthWrapper = ({ children }) => {
  const { isLoading, error } = useAuth0();
  if (isLoading)
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  if (error)
    return (
      <Wrapper>
        <Error message={"There was a problem with the authentication."} />
      </Wrapper>
    );
  return children;
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`;

export default AuthWrapper;
