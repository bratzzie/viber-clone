import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function Loading() {
  const classes = useStyles();

  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <div className={classes.root}>
          <CircularProgress color="secondary" />
        </div>
      </div>
    </center>
  );
}
