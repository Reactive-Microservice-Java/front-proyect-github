import { useState } from "react";
import "./App.css";
import TeamParticipationChart from "./TeamParticipationChart";

function App() {
  const [team, setTeam] = useState(0);
  const [comision, setComision] = useState(0);
  const handleChange = (e) => {
    setComision(e.target.value);
  };

  const handleChangeGroups = (e) => {
    checkGroups(e.target.value);
  };

  const checkGroups = (team) => {
    if (comision == 3) {
      const teamConv = "1" + team;
      setTeam(parseInt(teamConv));
    } else setTeam(team);
  };

  return (
    <>
      <div>Comision:</div>
      <select onChange={handleChange}>
        <option value="1">1024TDPRON1C01LAED0523PT</option>
        <option value="3">1024TDPRON1C03LAED0523PT</option>
      </select>
      <div>Grupo:</div>
      <select onChange={handleChangeGroups}>
        <option value="1">Grupo 1</option>
        <option value="2">Grupo 2</option>
        <option value="3">Grupo 3</option>
        <option value="4">Grupo 4</option>
        <option value="5">Grupo 5</option>
        <option value="6">Grupo 6</option>
      </select>
      <TeamParticipationChart teamId={team} comision={comision} />
    </>
  );
}

export default App;
