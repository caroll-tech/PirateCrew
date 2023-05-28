import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { Paper, Button } from "@mui/material";
import { styles } from "../mui-style/style";

export const PirateList = () => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [treasureChests, setTreasureChests] = useState("");
  const [crewPosition, setCrewPosition] = useState("");
  const [catchPhrase, setCatchPhrase] = useState("");
  const [pegLeg, setPegLeg] = useState("");
  const [eyePatch, setEyePatch] = useState("");
  const [hookHand, setHookHand] = useState("");

  const [pirates, setPirates] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const handleClick = (id) => navigate(`/pirate/${id}`);

  useEffect(() => {
    axios.get("http://localhost:8000/api/pirates").then((res) => {
      setName(res.data.name);
      setImageUrl(res.data.imageUrl);
      setTreasureChests(res.data.treasureChests);
      setCrewPosition(res.data.crewPosition);
      setCatchPhrase(res.data.catchPhrase);
      setPegLeg(res.data.pegLeg);
      setEyePatch(res.data.eyePatch);
      setHookHand(res.data.hookHand);
      setPirates(res.data);
      setLoaded(true);
    });
  }, []);
  const removeFromDom = (pirateId) => {
    setPirates(pirates.filter((pirate) => pirate._id !== pirateId));
  };
  const deletePirate = (pirateId) => {
    axios.delete("http://localhost:8000/api/pirate/" + pirateId).then((res) => {
      removeFromDom(pirateId);
    });
  };

  return (
    <Paper elevation={5} style={styles.paper}>
      <div className="title">
        <div className="titulo">
          <h1>Pirate Crew</h1>
        </div>
        <div className="btn-right">
          <button
            type="button"
            className="btn-blue"
            onClick={() => navigate("/pirate/new")}
          >
            Add Pirate
          </button>
        </div>
      </div>
      <div className="container-list">
        {pirates.map((pirate, idx) => {
          return (
            <div className="pirate-card" key={idx}>
              <div className="image-card">
                <img className="img-small" src={pirate.imageUrl} key={idx} />
              </div>
              <div className="action-card">
                <div className="card-name">
                  <h3>{pirate.name}</h3>
                </div>
                <div className="card-button">
                  <button
                    className="btn-blue"
                    id={pirate._id}
                    onClick={(e) => handleClick(e.target.id)}
                  >
                    View Pirate
                  </button>
                  <button
                    className="btn-red"
                    id={pirate._id}
                    onClick={(e) => deletePirate(e.target.id)}
                  >
                    Walk the Plank
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Paper>
  );
};
