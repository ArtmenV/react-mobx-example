import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react";
import "./mobxConfig";

import GlobalTitle from "./GlobalTitle";
import OnlineUser from "./OnlineUser";
import LocalState from "./LocalState";
import globalState from "./GlobalState";

import "./styles.css";

const TitlesHistory = observer(({ state }) => {
  console.log("render <TitlesHistory />");

  return (
    <div>
      <b>Title change history:</b>
      {state.titlesHistory.map((title, index) => (
        <div key={index}>{title}</div>
      ))}
    </div>
  );
});

const LocalTitle = observer(({ state }) => {
  console.log("render <LocalTitle />");

  const handleTitleChange = useCallback(e => {
    state.handleTitlechange(e);
    globalState.globalTitle = e.target.value;
  }, []);

  return (
    <div>
      <h2>{state.title}</h2>
      <div>
        <input value={state.title} onChange={handleTitleChange} />
      </div>
    </div>
  );
});

const Counter = observer(({ state }) => {
  console.log("render <Counter />");

  return (
    <div>
      <div>Counter: {state.count}</div>
      <button onClick={state.increment}>Increment</button>
    </div>
  );
});

const AsyncData = observer(({ state }) => {
  console.log("render <AsyncData />");

  const { isFetching, error, data } = state.async;
  let content = null;
  if (isFetching) {
    content = <div>Fetching...</div>;
  } else if (error) {
    content = <div>Error: {error}</div>;
  } else {
    content = <div>{data}</div>;
  }

  return (
    <div>
      <h4>Async component</h4>
      {content}
      {isFetching === false && (
        <div>
          <button
            onClick={() => {
              state.fetchData();
            }}
          >
            Fetch again
          </button>
          <button
            onClick={() => {
              state.fetchData(true);
            }}
          >
            Fetch again with error
          </button>
        </div>
      )}
    </div>
  );
});

const App = observer(() => {
  console.log("render <App />");
  // Declare states
  const [state] = useState(new LocalState());

  // Declare effects
  useEffect(state.titlesHistoryEffect, []);
  useEffect(() => {
    state.fetchData();
  }, []);

  return (
    <div className="App">
      <LocalTitle state={state} />
      <GlobalTitle />
      <Counter state={state} />
      <AsyncData state={state} />
      <br />
      <OnlineUser userId={1} />
      <OnlineUser userId={2} />
      <OnlineUser userId={3} />
      <OnlineUser userId={4} />
      <br />
      <TitlesHistory state={state} />
    </div>
  );
});

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
