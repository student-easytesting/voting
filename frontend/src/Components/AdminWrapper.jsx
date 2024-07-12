import AdminData from "./AdminData";
import RegistrationTime from "./Registrationtime";
import VotingTime from "./Votingtime";

const AdminWrapper = () => {
  return (
    <>
      <AdminData />
      <div className="settimer">
        <RegistrationTime />
        <VotingTime />
      </div>
    </>
  );
};

export default AdminWrapper;
