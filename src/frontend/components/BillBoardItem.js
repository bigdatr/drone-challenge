import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import nanoid from "nanoid";

import "./BillboardItem.css";

export default function Billboard({ billboard }) {
  const [isOpen, toggleOpen] = useState(false);

  const billboardCoordinates = billboard[0];
  const billboardData = billboard[1];

  return (
    <div
      className="billboard-item"
      onClick={() => {
        toggleOpen(!isOpen);
      }}
      style={{ height: isOpen ? "100%" : "70px" }}
    >
      <div className="billboard-item-container">
        <div className="billboard-coordinates">
          billboard Coordinates: <span>{billboardCoordinates}</span>
        </div>
        <div className="billboard-total-visits">
          Total visits by drones: <span>{billboardData.visitCount}</span>
        </div>
        <div className="billboard-chevron">
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
      {isOpen && (
        <div>
          <h3>Drone Visit history:</h3>
          {billboardData.visits.map(visit => (
            <div className="visit-item-wrapper" key={nanoid()}>
              <div className="visit-item-drone-id">
                Drone Id: <span>{visit.droneId}</span>
              </div>
              <div className="visit-item-timestamp">
                Visit time:
                <span>
                  {new Date(visit.timestamp).toLocaleTimeString("en-AU")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
