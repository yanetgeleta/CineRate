import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../context/AuthContext";

const ProfilePic = ({ imgClass }) => {
  const { user } = useAuth();
  return <img className={imgClass} src={user.profile_pic_url} />;
};
export default ProfilePic;
