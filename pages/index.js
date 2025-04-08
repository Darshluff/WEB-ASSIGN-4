/*********************************************************************************
 *  WEB422 – Assignment 5
 *
 *  I declare that this assignment is my own work in accordance with Seneca's
 *  Academic Integrity Policy:
 *
 *  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 *  Name:Darsh Sumanbhai Parmar Student ID: 151958238 Date: 2025-03-21
 *
 ********************************************************************************/

import { Row, Col, Image } from "react-bootstrap";

export default function Home() {
  return (
    <>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
        fluid
        rounded
      />
      <br />
      <br />
      <Row>
        <Col md={6}>
          The Metropolitan Museum of Art of New York City, founded in 1870, is
          the largest art museum in the Americas.
        </Col>
        <Col md={6}>
          Its permanent collection contains over two million works, divided
          among 17 curatorial departments.
          <a
            href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Learn more
          </a>
        </Col>
      </Row>
    </>
  );
}
