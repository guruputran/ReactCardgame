/** @format */

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getDeck, distributeCards } from "../components/Card";
import { Button, Form } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modals from "../components/Modals";
import { toast } from "react-toastify";
import { IconContext } from "react-icons";
import { FiAward } from "react-icons/fi";
import shortid from "shortid";

//https://www.geeksforgeeks.org/reactjs-toast-notification/

const schema = yup.object().shape({
  player: yup
    .number()
    .required()
    .positive()
    .integer()
    .typeError("Greater than zero pls"),
});
//https://www.thatsoftwaredude.com/content/6196/coding-a-card-deck-in-javascript
//https://www.youtube.com/watch?v=LIkIM5u1mCk

const Homescreen = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const [players, setPlayers] = useState([]);
  const [tdeck, setTdeck] = useState(getDeck());
  const [unluckyplayers, setUnluckyPlayers] = useState([]);
  const [playerList, setPlayerList] = useState([]);
  const [playersdeck, setPlayersDeck] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modal, setModal] = useState(null);
  const [modalplayer, setModalPlayer] = useState(null);
  const [modalDeck, setModalDeck] = useState([]);
  const [btntrigger, setBtntrigger] = useState([]);

  //reactjsexample.com/a-very-simple-and-lightweight-component-to-create-toasts/

  const clickMe = () => {
    setTdeck(getDeck());
  };

  const onSubmit = (data) => {
    let finalData = distributeCards(data, tdeck);

    if (finalData) {
      setUnluckyPlayers(finalData[1]); //correct!
      //https://stackoverflow.com/questions/35249774/remove-all-elements-from-array-that-match-specific-string
      let myArray = finalData[0];
      let players1 = [];
      //first extract players..
      for (let j = 0; j < myArray.length; j += 2) {
        let narr = myArray[j];
        players1.push(narr);
      }

      setPlayerList(players1);
      //now extract card deck for the players
      let playerdeck = [];
      for (let j = 1; j < myArray.length; j += 2) {
        let narr = myArray[j];
        playerdeck.push(narr);
      }
      let balanceDek = finalData[2];
      if (balanceDek.length > 0) {
        for (let i = 0; i < playerdeck.length; i++) {
          playerdeck[i].push(balanceDek[i]);
        }
      }
      setPlayersDeck(playerdeck);

      let btArray = [];
      for (let i = 0; i < playersdeck.length; i++) {
        let bts = false;
        if (playersdeck[i].some((ele) => ele.Value === "-1")) {
          bts = true;
        }
        btArray.push(bts);
      }
      // setBtntrigger(btArray);
      setBtntrigger(btArray);
    } //end if

    if (btntrigger.length > 0) {
      toast.info("Successful Game played, check cards with players");
    }
  }; //end submit

  const openModal = (index, player, deck) => {
    setModalShow(true);
    setModal(index);
    setModalPlayer(player);
    setModalDeck(deck);
  };
  // console.log(errors);
  const handleChange = (event) => {
    const value = event.target.value;
    setPlayers(value);
  };

  const renderMe = () => {
    return (
      <>
        {playerList.sort().map((player, idx) => {
          return (
            <>
              <div className="col-sm-2 m-3">
                {btntrigger.length > 0 ? (
                  btntrigger[idx] ? (
                    <Button
                      key={shortid.generate()}
                      variant="dark"
                      type="button"
                      onClick={() => openModal(idx, player, playersdeck[idx])}
                    >
                      {player}
                    </Button>
                  ) : (
                    <>
                      <IconContext.Provider
                        key={shortid.generate()}
                        value={{ color: "red", size: "30px" }}
                      >
                        <div>
                          <FiAward />
                        </div>
                      </IconContext.Provider>
                      <Button
                        key={shortid.generate()}
                        variant="success"
                        type="button"
                        onClick={() => openModal(idx, player, playersdeck[idx])}
                      >
                        {player}
                      </Button>
                    </>
                  )
                ) : (
                  <Button key={shortid.generate()}>Initialized</Button>
                )}
              </div>
            </>
          );
        })}
        <Modals
          id={modal}
          key={shortid.generate()}
          player={modalplayer}
          show={modalShow}
          deck={modalDeck}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  };
  const unluckys = () => {
    return (
      <>
        {unluckyplayers.sort().map((player, idy) => {
          return (
            <div key={idy} className="col-sm-2 m-3">
              <Button variant="danger" type="button" onClick={() => {}}>
                {player}
              </Button>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="row hscreen">
        <div className="col-sm-6">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formBasicPlayers">
              <Form.Label>Total players</Form.Label>
              <Form.Control
                placeholder="Enter number of players"
                name="player"
                value={players}
                type="number"
                ref={register}
                onChange={handleChange}
              />
              <p className="text-danger">{errors.player?.message}</p>
            </Form.Group>
            <Button
              key={shortid.generate()}
              className="float-right mr-3"
              variant="dark"
              type="submit"
            >
              Play
            </Button>

            <Button
              key={shortid.generate()}
              variant="info"
              onClick={() => {
                clickMe();
              }}
              type="button"
            >
              Shuffle
            </Button>
          </Form>

          <hr />
          {tdeck.map((dek, idx) => {
            return (
              <div key={shortid.generate()} className="card">
                <div key={shortid.generate()} className="value">
                  {dek["Value"]}
                </div>
                <div
                  key={shortid.generate()}
                  className={
                    dek["Suit"] === "spades"
                      ? "suit spades"
                      : dek["Suit"] === "hearts"
                      ? "suit hearts"
                      : dek["Suit"] === "diamonds"
                      ? "suit diamonds"
                      : dek["Suit"] === "clubs"
                      ? "suit clubs"
                      : ""
                  }
                ></div>
              </div>
            );
          })}
        </div>
        <div className="col-sm-6">
          <div key={shortid.generate()} className="row">
            <h4>Lucky Players</h4>
            {renderMe()}
          </div>
          <hr />
          <div key={shortid.generate()} className="row">
            <h4>Un-Lucky Players</h4>
            {unluckys()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Homescreen;
