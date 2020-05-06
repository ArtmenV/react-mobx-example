import { observable } from "mobx";

class GlobalState {
  @observable globalTitle = "Global title";

  handleGlobalTitleChange = e => {
    this.globalTitle = e.target.value;
  };
}

const globalState = new GlobalState();

export default globalState;
