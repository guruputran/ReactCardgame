/** @format */

import React from "react";
import { Container, Alert } from "react-bootstrap";

function Header() {
  return (
    <>
      <Container>
        <Alert variant="secondary">
          <h1 className="text-center">
            Welcome to the Amazing Card Game play center
          </h1>
        </Alert>
      </Container>
    </>
  );
}

export default Header;
