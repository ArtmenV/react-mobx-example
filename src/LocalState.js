import { observable, reaction } from "mobx";

export default class LocalState {
  @observable count = 1;
  @observable title = "Title";
  @observable titlesHistory = [];
  @observable async = {
    isFetching: false,
    isDataLoaded: false,
    error: null,
    data: null
  };

  increment = () => {
    this.count++;
  };

  handleTitlechange = e => {
    this.title = e.target.value;
  };

  fetchData = async (withError = false) => {
    const { async } = this;
    async.isFetching = true;

    try {
      await sleep(2000);
      if (withError) throw new Error("Some api error");

      async.error = null;
      async.data = "Server time is: " + new Date().toISOString();
      async.isFetching = false;
      async.isDataLoaded = true;
    } catch (e) {
      async.error = e.message;
      async.isFetching = false;
    }
  };

  titlesHistoryEffect = () => {
    return reaction(
      () => this.title,
      () => {
        this.titlesHistory.push(this.title);
      }
    );
  };
}

const sleep = ms =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
