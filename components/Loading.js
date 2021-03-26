import { Circle } from "better-react-spinkit";

const Loading = () => {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <img
          src="http://assets.icons.iconarchive.com/icons/papirus-team/papirus-apps/128/viber-icon.png"
          alt="logo"
          height={200}
          style={{ marginBottom: 10 }}
        />
        <Circle color="violet" size={60} />
      </div>
    </center>
  );
};

export default Loading;
