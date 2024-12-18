/* eslint-disable react/prop-types */
import { useState } from "react";
import "./App.css";
import TeamParticipationChart from "./TeamParticipationChart";

const CommissionSelect = ({ onChange }) => (
  <div className="selection-group">
    <label htmlFor="commission">Comisión:</label>
    <select name="commission" id="commission" onChange={onChange}>
      <option value="1">1024TDPRON1C01LAED0523PT</option>
      <option value="3">1024TDPRON1C03LAED0523PT</option>
    </select>
  </div>
);

const TeamSelect = ({ onChange }) => (
  <div className="selection-group">
    <label htmlFor="team">Team:</label>
    <select name="team" id="team" onChange={onChange}>
      <option value="0">Select Team</option>
      <option value="1">Team 1</option>
      <option value="2">Team 2</option>
      <option value="3">Team 3</option>
      <option value="4">Team 4</option>
      <option value="5">Team 5</option>
      <option value="6">Team 6</option>
    </select>
  </div>
);

function App() {
  const [team, setTeam] = useState(0);
  const [commission, setCommission] = useState(0);

  const handleSelectionChange = (e) => {
    const { name, value } = e.target;

    if (name === "commission") {
      setCommission(value);
      setTeam(0); // Reset team when commission changes
    } else if (name === "team") {
      const adjustedTeam =
        value && commission === "3" ? parseInt(`1${value}`) : parseInt(value);
      setTeam(adjustedTeam);
    }
  };

  return (
    <>
      <div className="app-container">
        <h1 className="app-title">Team Participation Dashboard</h1>
        <div className="selection-container">
          <CommissionSelect onChange={handleSelectionChange} />
          <TeamSelect onChange={handleSelectionChange} />
        </div>
        <TeamParticipationChart teamId={team} comision={commission} />
      </div>
    </>
  );
}

export default App;
