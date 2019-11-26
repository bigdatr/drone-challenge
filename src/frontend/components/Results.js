import React from "react";
import useFetch from "react-fetch-hook";

import BillboardItem from "./BillBoardItem";

export default function Results({ numberOfDrones, instructionsFile }) {
  const formData = new FormData();
  formData.append("numberOfDrones", numberOfDrones);
  formData.append("instructions", instructionsFile);

  const { isLoading, data } = useFetch("http://localhost:4001/instructions", {
    method: "PUT",
    body: formData
  });
  if (isLoading) {
    return "Loading...";
  }

  return (
    <div>
      <h1>Drone Survey Results</h1>

      <p>
        Total billboards visited: <strong>{data.length}</strong>
      </p>

      <div>
        {data.map(billboard => (
          <BillboardItem billboard={billboard} key={billboard[0]} />
        ))}
      </div>
    </div>
  );
}
