import React, { useState } from "react";
import "./styles.css";
import InlineEdit from "./components/inlineEdit";
import {
  NEEDS_COMMON_IEVA,
  NEEDS_COMMON_ROL,
  NEEDS_COMMON_CNVC,
} from "./data/data";

import {
  Accordion,
  Card,
  Button,
  Alert,
  Container,
  Row,
  Col,
} from "react-bootstrap";

export default function App() {
  const DEFAULT_COLOR = "black";

  const [choice, setChoice] = useState([]);
  const [spalva, setSpalva] = useState({ color: DEFAULT_COLOR });
  const [side1, setSide1] = useState("1 pusė");
  const [side2, setSide2] = useState("2 pusė");
  const [side3, setSide3] = useState("3 pusė");

  const [side1data, setSide1Data] = useState([]);

  const sides = {
    firstSide: "Pirma pusė",
    secondSide: "Antra pusė",
    together: "Abi pusės",
  };

  const getColor = () => {
    if (choice == sides.firstSide) {
      return "red";
    }
    if (choice == sides.secondSide) {
      return "blue";
    }
    if (choice == sides.together) {
      return "green";
    }
  };
  const setColor = (e) => {
    const targetColor = e.target.style.color;
    const tagName = e.target.tagName;
    const choiceColor = getColor();
    const textContent = e.target.textContent;
    console.log(
      `target color: ${targetColor} choice color: ${choiceColor}\tagName: ${tagName} text: ${textContent}`
    );
    let newColor = DEFAULT_COLOR;
    // add to list if conditions are met
    if (
      targetColor != choiceColor &&
      newColor != null &&
      choiceColor != undefined &&
      tagName == "LI"
    ) {
      newColor = choiceColor;
      // adding element and removing dublicates from array
      side1data.indexOf(textContent) === -1
        ? setSide1Data((oldArray) => [...oldArray, textContent])
        : console.log("This item already exists");
    } else {
      newColor = null;
      setSide1Data(side1data.filter((e)=>(e !== textContent)))
    }
    e.target.style.color = newColor;
    console.log(targetColor);
    console.log(newColor);
  };

  return (
    <Container fluid="false" style={{ backgroundColor: "whitesmoke" }}>
      <Alert variant="info">
        Pasirinkta: <b>{choice}</b>
        <div class="puses">
          <div
            class="pusesElementas"
            onClick={(e) => setChoice(sides.firstSide)}
          >
            <div class="red column"></div>
            <InlineEdit text={side1} onSetText={(text) => setSide1(text)} />
          </div>
          <div
            class="pusesElementas"
            onClick={() => setChoice(sides.secondSide)}
          >
            <div class="blue column"></div>
            <InlineEdit text={side2} onSetText={(text) => setSide2(text)} />
          </div>
          <div class="pusesElementas" onClick={() => setChoice(sides.together)}>
            <div class="green column"></div>
            <InlineEdit text={side3} onSetText={(text) => setSide3(text)} />
          </div>
        </div>
      </Alert>

      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Poreikiai
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {" "}
              <div className="Column">
                <Row>
                  {NEEDS_COMMON_ROL.map((s) => (
                    <div class="poreikiai">
                      <h4>{s.title}</h4>
                      <div style={spalva} onClick={(e) => setColor(e)}>
                        <ol>
                          {s.elements.map((poreikis) => (
                            <Col>
                              <li key={poreikis}>{poreikis}</li>
                            </Col>
                          ))}
                        </ol>
                      </div>
                    </div>
                  ))}
                </Row>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

      <hr />
      <Container>
        <p>
          Konstruktyvus konflikto deeskalavimas atsižvelgiant į abiejų pusių
          poreikius ir jausmus.
        </p>
        <p><b>1. Žingsnis.</b> Atspindėjimas kitos pusės jausmus ir poreikius.</p>
        <Row>
          <Col>
            <p><b>Stebėjimas</b></p> <i>kai matau / girdžiu</i>
          </Col>
          <Col>
            <p><b>Jausmas</b></p> <i>atrodo, kad jauti</i>
          </Col>
          <Col>
            <p><b>Poreikis</b></p> <p><i>nes yra noras?</i></p>
            {side1data.map((element) => (
              <p>{element}</p>
            ))}
          </Col>
          <Col>Ar gerai tave suprantu?</Col>
        </Row>
      </Container>
    </Container>
  );
}
