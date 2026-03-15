import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../context/AuthContext";

const ProfilePic = () => {
  const { user } = useAuth();
  return (
    <button>
      <img src={user.profile_pic_url} />
    </button>
  );
};
export default ProfilePic;
