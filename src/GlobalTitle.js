import React from "react";
import { observer } from "mobx-react";

import globalState from "./GlobalState";

const GlobalTitle = observer(() => {
  console.log("render <GlobalTitle />");

  return (
    <>
      <h2>Global title: {globalState.globalTitle}</h2>
    </>
  );
});

export default GlobalTitle;
