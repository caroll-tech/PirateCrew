import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { Paper } from "@mui/material";
import { styles } from "../mui-style/style";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export const PirateForm = () => {
  const [validated, setValidated] = useState(false);

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [treasureChests, setTreasureChests] = useState("");
  const [crewPosition, setCrewPosition] = useState("");
  const [catchPhrase, setCatchPhrase] = useState("");
  const [pegLeg, setPegLeg] = useState(false);
  const [eyePatch, setEyePatch] = useState(false);
  const [hookHand, setHookHand] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const onSubmitHandler = (e) => {
    //evitar el comportamiento por defecto de submit

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    //hacer una petición POST para crear una nueva persona
    axios
      .post("http://localhost:8000/api/pirate", {
        name,
        imageUrl,
        treasureChests,
        crewPosition,
        catchPhrase,
        pegLeg,
        eyePatch,
        hookHand,
      })
      .then((res) => console.log(res))
      .catch((err) => {
        const errorResponse = err.response.data.errors; // Get the errors from err.response.data
        const errorArr = []; // Define a temp error array to push the messages in
        for (const key of Object.keys(errorResponse)) {
          // Loop through all errors and get the messages
          errorArr.push(errorResponse[key].message);
        }
        // Set Errors
        setErrors(errorArr);
        console.log(errorArr);
      });
  };

  return (
    <Paper elevation={5} style={styles.paper}>
      <div className="title">
        <div className="titulo">
          <h1>Add Pirate</h1>
        </div>
        <div className="btn-right">
          <button
            type="button"
            className="btn-blue"
            onClick={() => navigate("/pirates")}
          >
            Crew Boord
          </button>
        </div>
      </div>
      <div className="container-form">
        <Form validated={validated} noValidate onSubmit={onSubmitHandler}>
          {errors.map((err, index) => (
            <p key={index}>{err}</p>
          ))}

          <Form.Group className="mb-3">
            <Form.Label>Pirate Name</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                required
                type="text"
                placeholder=""
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                Pirate Name is requerid
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Crew Position</Form.Label>

            <Form.Select
              required
              onChange={(e) => setCrewPosition(e.target.value)}
              value={crewPosition}
            >
              <option value="Captain">Captain</option>
              <option value="First Mate">First Mate</option>
              <option value="Quarter Master">Quarter Master</option>
              <option value="Bootwain">Bootwain</option>
              <option value="Powder Monkey">Powder Monkey</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image Url</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                required
                type="text"
                placeholder=""
                onChange={(e) => setImageUrl(e.target.value)}
                value={imageUrl}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                Image Url is requerid
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label># of Treasure Cheasts</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                required
                type="number"
                step="1"
                placeholder=""
                onChange={(e) => setTreasureChests(e.target.value)}
                value={treasureChests}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                Treasure Cheasts is requerid
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Pirate Catch Phrase</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                required
                type="text"
                placeholder=""
                onChange={(e) => setCatchPhrase(e.target.value)}
                value={catchPhrase}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                Pirate Catch Phrase Cheasts is requerid
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Peg Legt"
              onChange={() => setPegLeg(!pegLeg)}
              checked={pegLeg}
            />
            <Form.Check
              type="checkbox"
              label="Eye Patch"
              onChange={() => setEyePatch(!eyePatch)}
              checked={eyePatch}
            />
            <Form.Check
              type="checkbox"
              label="Hook Hand"
              onChange={() => setHookHand(!hookHand)}
              checked={hookHand}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Paper>
  );
};
