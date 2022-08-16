import { useSelector } from "react-redux";
import { userDetails } from "../../store";

const Welcome = () => {
  const user = useSelector(userDetails);
  return (
    <>
      <div>Welcome to Onboarding Application...</div>
      {user && (
        <div>
          {user.name} with role {user.role}
        </div>
      )}
    </>
  );
};

export default Welcome;
