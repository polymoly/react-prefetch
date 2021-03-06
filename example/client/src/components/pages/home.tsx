import { useNavigate, Link } from "react-router-dom";
import { useUsersPrefetch, useLoadingContext } from "../../App";
import { Progressbar } from "./progressbar";
import useStyles from "./style";

const Home = () => {
  const navigate = useNavigate();
  const { prefetch } = useUsersPrefetch({
    onError: () => navigate("/users"),
  });
  const classes = useStyles();
  const { progress, isLoading } = useLoadingContext();

  return (
    <div className={classes.homeContainer}>
      <Progressbar isLoading={isLoading} progress={progress} />
      <div className={classes.cardContainer}>
        <h1>Home</h1>
        <div>
          <Link
            to="/users"
            onClick={(e) => {
              e.preventDefault();
              prefetch?.({ navigate });
            }}
          >
            <button style={{ margin: 4 }}>Routing with prefetch</button>
          </Link>
          <Link to="/users">
            <button style={{ margin: 4 }}>Routing without prefetch</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
