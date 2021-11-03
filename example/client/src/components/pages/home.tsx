import { useHistory, Link } from "react-router-dom";
import { PrefetchLink } from "../../../../../src";
import { Progressbar, useHooks } from "../../App";
import useStyles from "./style";

const Home = () => {
  const { prefetch } = useHooks.usersPrefetch();
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.homeContainer}>
      <Progressbar />
      <div className={classes.cardContainer}>
        <h1>Home</h1>
        <div>
          <PrefetchLink to="/users" onPrefetch={() => prefetch?.({ history })}>
            <button style={{ margin: 4 }}>Routing with prefetch</button>
          </PrefetchLink>
          <Link to="/users">
            <button style={{ margin: 4 }}>Routing without prefetch</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
