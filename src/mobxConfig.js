import { configure } from "mobx";

// Configure MobX to auto batch all sync mutations without using action/runInAction
setTimeout(() => {
  configure({
    reactionScheduler: f => {
      setTimeout(f, 0);
    }
  });
}, 0);
