import React, { useState } from "react";
import { useValue } from "../store/store";
import { toast } from "react-toastify";

const CastVote = () => {
  const { contract } = useValue();

  const [selectedValues, setSelectedValues] = useState({
    preference1: "",
    preference2: "",
    preference3: "",
    preference4: "",
    preference5: "",
  });

  const teams = ["Team 1", "Team 2", "Team 3", "Team 4", "Team 5"];

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setSelectedValues({
      ...selectedValues,
      [name]: value,
    });
  };

  const updateOptions = (currentValue) => {
    return teams.filter(
      (team) =>
        !Object.values(selectedValues).includes(team) || team === currentValue
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = Object.values(selectedValues).every(
      (value) => value !== ""
    );
    if (!isValid) {
      alert("Please select a team for each preference.");
      return;
    }

    const preferenceIndices = Object.values(selectedValues).map((team) => {
      switch (team) {
        case "Team 1":
          return 0;
        case "Team 2":
          return 1;
        case "Team 3":
          return 2;
        case "Team 4":
          return 3;
        case "Team 5":
          return 4;
        default:
          return -1;
      }
    });

    // Output the array (you can also send it to the server if needed)
    console.log(preferenceIndices);
    const tx = await contract.vote(preferenceIndices);
    await tx.wait();
    toast.success("Success!");
  };
  return (
    <>
      <form onSubmit={handleSubmit} id="preferencesForm">
        {Object.keys(selectedValues).map((preference, index) => (
          <div key={index}>
            <label className="teamlabel">
              Choice {index + 1}:
              <select
                name={preference}
                value={selectedValues[preference]}
                onChange={handleSelectChange}
                className="team-select"
              >
                <option value="">Select a Team</option>
                {updateOptions(selectedValues[preference]).map((team, idx) => (
                  <option key={idx} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ))}
        <button type="submit" className="votebtn">
          Cast Vote
        </button>
      </form>
    </>
  );
};

export default CastVote;
