import React from "react";

import { CSpinner } from "@coreui/react";

function AppDataFetchLoader(props) {
  return (
    <div>
      {props.loading && (
        <div className="text-center">
          <CSpinner size="sm" />
          <span className="h5 ms-2">Data is Fetching</span>
        </div>
      )}
    </div>
  );
}

export default AppDataFetchLoader;
