import React from "react";
import Link from "next/link";

function BackToDashboard({ to = "portal", url = "/portal" }) {
  return (
    <Link href={url}>
      <div>
        <p
          style={{ fontFamily: "Roboto" }}
          className="text-xs pb-4 text-[#5522A9] hover:cursor-pointer font-bold"
        >
          {" "}
          <i className="bi-arrow-left text-xs text-[#5522A9]"> </i> &nbsp; Back
          to {to}
        </p>
      </div>
    </Link>
  );
}

export default BackToDashboard;
