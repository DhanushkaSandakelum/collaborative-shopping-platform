import React from "react";

import { CFooter, CLink } from "@coreui/react";

function AppFooter() {
  return (
    <CFooter>
      <div>
        <CLink href="https://coreui.io">Middleware Assignment</CLink>
        <span>&copy; 2022 UCSC</span>
      </div>
      <div>
        <span>Powered by </span>
        <CLink href="https://coreui.io">React & Spring boot</CLink>
      </div>
    </CFooter>
  );
}

export default AppFooter;
