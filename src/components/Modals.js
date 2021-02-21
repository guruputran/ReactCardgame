/** @format */
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { IconContext } from "react-icons";
import { GiCardJoker } from "react-icons/gi";
import shortid from "shortid";

//https://react-bootstrap.github.io/components/modal/
//stackoverflow.com/questions/63513788/how-do-i-make-a-map-of-modals-that-open-onclick-for-each-map-of-buttons
export default function Modals(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <p key={Date.now()}> {props.player} wins:</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.deck.map((dek, idx) => {
          return (
            <>
              <span key={idx} id="container">
                <div className="card">
                  <div className="value">
                    {dek["Value"] !== "-1" ? (
                      dek["Value"]
                    ) : (
                      <IconContext.Provider
                        value={{ color: "red", size: "80px" }}
                      >
                        <div>
                          <GiCardJoker />
                        </div>
                      </IconContext.Provider>
                    )}
                  </div>
                  <div
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
              </span>
            </>
          );
        })}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
