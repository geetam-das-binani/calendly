import requireUser from "@/lib/hooks";
import React from "react";


const DashBoard = async () => {
  const session = await requireUser();

  return <div></div>;
};

export default DashBoard;
