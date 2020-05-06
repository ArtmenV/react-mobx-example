class OnlineSubscriber {
  users = {};
  lastStatus = false;
  lastInterval = 1000;

  subscribe = (userId, onStatusChange) => {
    if (!this.users[userId]) {
      this.lastStatus = !this.lastStatus;
      this.lastInterval += 1000;

      this.users[userId] = {
        online: this.lastStatus,
        subscribers: new Set([onStatusChange])
      };

      const user = this.users[userId];

      //onStatusChange(user.online);

      setInterval(() => {
        user.online = !user.online;
        user.subscribers.forEach(fn => {
          fn(user.online);
        });
      }, this.lastInterval);
    } else {
      //onStatusChange(this.users[userId].online);
      this.users[userId].subscribers.add(onStatusChange);
    }
  };

  unSubscribe = (userId, onStatusChange) => {
    this.users[userId].subscribers.delete(onStatusChange);
  };
}

const onlineSubscriber = new OnlineSubscriber();

export default onlineSubscriber;
