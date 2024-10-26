import { MutatingDots } from "react-loader-spinner";
import s from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={s.loader}>
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#00000"
        secondaryColor="#00000"
        radius="10.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
