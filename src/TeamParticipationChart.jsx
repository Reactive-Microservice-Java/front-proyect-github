import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import "./teamParticipation.css";

// eslint-disable-next-line react/prop-types
const TeamParticipationChart = ({ teamId, comision }) => {
  const [data, setData] = useState([]);
  const [teamData, setTeamData] = useState({});
  const [startDate, setStartDate] = useState("2024-10-01T00:00:00");
  const [endDate, setEndDate] = useState("2024-12-31T23:59:59");

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().slice(0, 19);
  };

  const fetchData = () => {
    axios
      .get(`http://localhost:9091/api/analizer/team/${teamId}/participation`, {
        params: {
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
        },
      })
      .then((response) => {
        console.log(response.data);
        const teamResponseData = response.data.repos || [];

        //Transformar los datos para que sean compatibles con el gráfico
        const transformedData = response.data.authors.map((author) => ({
          name: author.name || "",
          additions: author.contributions.totalAdditions || "",
          deletions: author.contributions.totalDeletions || "",
          total: author.contributions.totalChanges || "",
        }));

        setTeamData(teamResponseData);
        setData(transformedData);
      })
      .catch((error) => {
        console.error("Error fetching team participation data: ", error);
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId, comision, startDate, endDate]);

  const handleSelectionChange = (e) => {
    const dateRanges = {
      primer: ["2024-10-21T00:00:00", "2024-10-31T23:59:59"],
      segundo: ["2024-11-01T00:00:00", "2024-11-14T23:59:59"],
      tercer: ["2024-11-15T00:00:00", "2024-11-28T23:59:59"],
      cuarto: ["2024-11-29T00:00:00", "2024-12-16T23:59:59"],
    };
    const [start, end] = dateRanges[e.target.value] || [];
    if (start && end) {
      setStartDate(start);
      setEndDate(end);
      fetchData();
    }
  };

  return (
    <div className="chart-container">
      <div className="date-inputs">
        <div className="left">
          <div className="titles">Team: {teamId}</div>
          <div className="titles">Repositories:</div>
          {teamData.length > 0 ? (
            <ul className="repositories-list">
              {teamData.map((repo) => (
                <li key={repo.id}>
                  <strong>Owner:</strong> {repo.owner} <br />
                  <strong>Repository:</strong> {repo.repositoryName}
                </li>
              ))}
            </ul>
          ) : (
            <p>No repositories available</p>
          )}
        </div>

        <div>
          <label>Select Sprint:</label>
          <select onChange={handleSelectionChange}>
            <option value="primer">1st Sprint</option>
            <option value="segundo">2nd Sprint</option>
            <option value="tercer">3rd Sprint</option>
            <option value="cuarto">4th Sprint</option>
          </select>

          <label>
            Start Date:
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>

          <label>
            End Date:
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
        </div>
      </div>

      {/* Leyenda del gráfico */}
      <div className="bar-chart-legend">
        <span className="bar-additions">Additions</span>
        <span className="bar-deletions">Deletions</span>
        <span className="bar-total">Total Changes</span>
      </div>

      {/* Gráfico */}
      <ResponsiveContainer width="100%" height={600}>
        {data && data[0]?.name != null ? (
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="additions" fill="#8884d8" />
            <Bar dataKey="deletions" fill="#82ca9d" />
            <Bar dataKey="total" fill="#00c658" />
          </BarChart>
        ) : (
          <p>No data available for the selected period</p>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default TeamParticipationChart;
