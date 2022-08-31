import { useEffect, useState } from "react";
import ReactGA from "react-ga";
import { useLocation } from "react-router-dom";
import { LOCAL_HOST } from "./App";

const RouteChangeTracker = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!window.location.href.includes(LOCAL_HOST)) {
      ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);
    }
    setInitialized(true);
  }, []);
  useEffect(() => {
    if (initialized) {
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [initialized, location]);
};

export default RouteChangeTracker;
