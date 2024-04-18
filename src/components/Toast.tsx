import React from "react";

interface ToastProps {
  message: string;
  type: "success" | "failure" | "";
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  return (
    <div className="toast" role="alert">
        <div
          className={`absolute top-16 right-5 p-4 rounded-lg shadow-lg text-white ${
            type === "success" ? "bg-green-500" : "bg-red-500"
          } transition-opacity`}
        >
          {message}
        </div>
    </div>
  );
};

export default Toast;