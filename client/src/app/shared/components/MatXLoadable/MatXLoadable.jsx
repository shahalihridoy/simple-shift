import Loadable from "react-loadable";
import Loading from "./Loading";

const MatXLoadable = opts => {
  return Loadable(
    Object.assign(
      {
        loading: Loading,
        delay: 300,
        timeout: 10000
      },
      opts
    )
  );
};

export default MatXLoadable;
