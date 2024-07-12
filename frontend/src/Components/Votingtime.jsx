import { useEffect } from "react";
import { useValue } from "../store/store";
import { toast } from "react-toastify";

const VotingTime = () => {
  const { contract } = useValue();

  // function setDefaultStartTime() {
  //   const now = new Date();
  //   const tomorrow = new Date(now);
  //   tomorrow.setDate(now.getDate() + 1); // Add one day to the current date

  //   const year = tomorrow.getFullYear();
  //   const month = ("0" + (tomorrow.getMonth() + 1)).slice(-2);
  //   const day = ("0" + tomorrow.getDate()).slice(-2);
  //   const defaultDate = `${year}-${month}-${day}T00:00`;

  //   const minDate = `${now.getFullYear()}-${("0" + (now.getMonth() + 1)).slice(
  //     -2
  //   )}-${("0" + now.getDate()).slice(-2)}T${("0" + now.getHours()).slice(
  //     -2
  //   )}:${("0" + now.getMinutes()).slice(-2)}`;

  //   const startTimeInput = document.getElementById("startTime1");
  //   startTimeInput.value = defaultDate;
  //   startTimeInput.min = minDate;
  // }
  function setDefaultStartTime() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1); // Add one day to the current date

    // Get current time for defaultDate
    const year = now.getFullYear();
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const day = ("0" + now.getDate()).slice(-2);
    const hours = ("0" + now.getHours()).slice(-2);
    const minutes = ("0" + now.getMinutes()).slice(-2);
    const defaultDate = `${year}-${month}-${day}T${hours}:${minutes}`;

    // Get current time for minDate
    const minDate = `${year}-${month}-${day}T${hours}:${minutes}`;

    const startTimeInput = document.getElementById("startTime1");
    startTimeInput.value = defaultDate;
    startTimeInput.min = minDate;
  }

  async function calculateUnixTime() {
    const startTimeInput = document.getElementById("startTime1").value;
    const durationInput = document.getElementById("duration1").value;
    const durationUnit = document.getElementById("durationUnit1").value;

    if (startTimeInput && durationInput) {
      const startTime = new Date(startTimeInput);
      const duration = parseInt(durationInput, 10);
      let durationInMilliseconds;

      if (durationUnit === "days") {
        durationInMilliseconds = duration * 24 * 60 * 60 * 1000;
      } else if (durationUnit === "hours") {
        durationInMilliseconds = duration * 60 * 60 * 1000;
      } else if (durationUnit === "minutes") {
        durationInMilliseconds = duration * 60 * 1000;
      }

      const startTimeUnix = Math.floor(startTime.getTime() / 1000);
      const endTime = new Date(startTime.getTime() + durationInMilliseconds);
      const endTimeUnix = Math.floor(endTime.getTime() / 1000);

      const tx = await contract.setVotingTimes(startTimeUnix, endTimeUnix);
      await tx.wait();
      toast.success("Success!");
    } else {
      toast.error("Error!");
    }
  }

  useEffect(() => {
    setDefaultStartTime();
  }, []);
  return (
    <>
      {/* <h2 className="setTime">Set Registration Start Time and Duration</h2> */}
      <form id="timeForm">
        <label htmlFor="startTime1">Voting Start Time:</label>
        <input
          type="datetime-local"
          id="startTime1"
          name="startTime"
          className="setinput"
          required
        />
        <br />
        <label htmlFor="duration1">Duration:</label>
        <input
          type="number"
          id="duration1"
          name="duration"
          className="setinput"
          required
        />
        <br />

        <select id="durationUnit1" name="durationUnit" className="setinput">
          <option value="days">Days</option>
          <option value="hours">Hours</option>
          <option value="minutes">Minutes</option>
        </select>
        <br />
        <input
          type="button"
          value="Submit"
          onClick={calculateUnixTime}
          className="setbtn"
        />
        <br />
      </form>
    </>
  );
};

export default VotingTime;
