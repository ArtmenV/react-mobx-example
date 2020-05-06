import { useEffect, useState } from "react";
import { observable } from "mobx";
import onlineSubscriber from "./onlineSubscriber";

class State {
  @observable online = null;
}

const useUserOnlineStatus = userId => {
  const [userState] = useState(new State());

  useEffect(() => {
    const handleStatusChange = status => {
      userState.online = status;
    };

    onlineSubscriber.subscribe(userId, handleStatusChange);

    return () => {
      onlineSubscriber.unSubscribe(userId, handleStatusChange);
    };
  }, []);

  return userState;
};

export default useUserOnlineStatus;
