import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { removeUser } from "@/redux/user/user.slice";
import { showToast } from "@/helpers/showToast";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(removeUser());
    showToast("success", "Logged out successfully!");
    navigate("/login", { replace: true });
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors rounded-md"
    >
      <FaSignOutAlt className="text-[#E24A3B]" />

      <span>Logout</span>
    </button>
  );
};

export default Logout;