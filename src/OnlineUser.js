import React from "react";
import { observer } from "mobx-react";

import useUserOnlineStatus from "./useUserOnlineStatus";

import "./styles.css";

const OnlineUser = observer(({ userId }) => {
  const userState = useUserOnlineStatus(userId);

  const { online } = userState;
  const status = online === null ? "Loading..." : online + "";

  return (
    <div>
      UserID #{userId}: {status}
    </div>
  );
});

export default OnlineUser;
