import React from "react";
import { Link, useParams } from "react-router-dom";

const SuccessPage = () => {
  const { studentId } = useParams();
  return (
    <div>
      <h1>Successfully Submitted!</h1>
      <h3>Student ID: {studentId}</h3>
      <Link to={"/"}>Click here for new selection</Link>
    </div>
  );
};

export default SuccessPage;
