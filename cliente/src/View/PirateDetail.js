import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

import {
  Paper,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  TextField,
} from "@mui/material";
import { styles } from "../mui-style/style";

export const PirateDetail = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [treasureChests, setTreasureChests] = useState("");
  const [crewPosition, setCrewPosition] = useState("");
  const [catchPhrase, setCatchPhrase] = useState("");
  const [pegLeg, setPegLeg] = useState("");
  const [eyePatch, setEyePatch] = useState("");
  const [hookHand, setHookHand] = useState("");

  const [pirate, setPirate] = useState({});
  useEffect(() => {
    axios.get("http://localhost:8000/api/pirate/" + id).then((res) => {
      setPirate({
        ...res.data,
      });
      setName(res.data.name);
      setImageUrl(res.data.imageUrl);
      setTreasureChests(res.data.treasureChests);
      setCrewPosition(res.data.crewPosition);
      setCatchPhrase(res.data.catchPhrase);
      setPegLeg(res.data.pegLeg);
      setEyePatch(res.data.eyePatch);
      setHookHand(res.data.hookHand);
    });
  }, []);

  useEffect(() => {
    console.log(pegLeg, eyePatch, hookHand);
    updatePirate();
  }, [pegLeg, eyePatch, hookHand]);

  const changePeLeg = () => {
    if (pegLeg == true) {
      setPegLeg(false);
    } else {
      setPegLeg(true);
    }
  };
  const changeEyePatch = () => {
    if (eyePatch == true) {
      setEyePatch(false);
    } else {
      setEyePatch(true);
    }
  };
  const changeHookHand = () => {
    if (hookHand == true) {
      setHookHand(false);
    } else {
      setHookHand(true);
    }
  };

  const updatePirate = () => {
    axios
      .put("http://localhost:8000/api/pirate/" + id, {
        name,
        imageUrl,
        treasureChests,
        crewPosition,
        catchPhrase,
        pegLeg,
        eyePatch,
        hookHand,
      })
      .then((res) => {
        console.log(res);
        setPirate({ ...res.data });
      });
  };

  return (
    <Paper elevation={5} style={styles.paper}>
      <div className="title">
        <h1> {name} </h1>
      </div>
      <div className="container">
        <div className="panel-left">
          <div className="pirate-imagen">
            <img className="img-dtl" src={imageUrl} />
          </div>
          <div className="pirate-phrase">
            <h2>"{catchPhrase}"</h2>
          </div>
        </div>
        <div className="panel-about">
          <div className="about-title">
            <h2>About</h2>
          </div>

          <div className="field">
            <div className="field-name">Position:</div>
            <div className="field-value">{crewPosition}</div>
          </div>

          <div className="field">
            <div className="field-name">Treasures:</div>
            <div className="field-value">{treasureChests}</div>
          </div>

          <div className="field">
            <div className="field-name">Peg Leg:</div>
            <div className="field-bol">
              <div className="field-value">
                {pegLeg == false ? "No" : "Yes"}
              </div>
              <Button
                href="#"
                variant="contained"
                size="small"
                className="button-right"
                color={pegLeg == false ? "success" : "error"}
                onClick={() => {
                  changePeLeg();
                }}
              >
                {pegLeg == false ? "Yes" : "No"}
              </Button>
            </div>
          </div>
          <div className="field">
            <div className="field-name">Eye Patch:</div>
            <div className="field-bol">
              <div className="field-value">
                {eyePatch == false ? "No" : "Yes"}
              </div>
              <Button
                href="#"
                variant="contained"
                size="small"
                className="button-right"
                color={eyePatch == false ? "success" : "error"}
                onClick={() => {
                  changeEyePatch();
                }}
              >
                {eyePatch == false ? "Yes" : "No"}
              </Button>
            </div>
          </div>
          <div className="field">
            <div className="field-name">Hook Hand:</div>
            <div className="field-bol">
              <div className="field-value">
                {hookHand == false ? "No" : "Yes"}
              </div>
              <Button
                href="#"
                variant="contained"
                size="small"
                className="button-right"
                color={hookHand == false ? "success" : "error"}
                onClick={() => {
                  changeHookHand();
                }}
              >
                {hookHand == false ? "Yes" : "No"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};
