import React from "react";
import { useEffect, useState } from "react";
import { ProfileCard, ProfileLoadingCard } from "./components/card";
import "./app.scss";
import { apiCall } from "./api";
import { useInfiniteScroll } from "./customHooks";

function App() {
  const [nextPage, setNextPage] = useState(null);
  const [APIError, SetAPIError] = useState(null);
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching, stop] = useInfiniteScroll(getMoreFeed);

  async function getMoreFeed() {
    if (nextPage) {
      const res = await apiCall({ method: "GET", page: nextPage });
      if (res === 500) {
        SetAPIError(500);
      } else {
        setData([...data, ...res.data]);
        setIsFetching(false);
        res.next
          ? setNextPage(nextPage + 1)
          : setNextPage(null)((stop.current = true));
      }
    } else {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    const getFeed = async () => {
      const res = await apiCall({ method: "GET" });
      if (res === 500) {
        SetAPIError(500);
      } else {
        setData(res.data);
        res.next ? setNextPage(2) : setNextPage(null)((stop.current = true));
      }
    };

    getFeed();
  }, []);

  if (APIError === 500) {
    return <h1>Some error occured</h1>;
  } else {
    return (
      <div className="feed_container">
        {!data && <ProfileLoadingCard />}
        {data?.map((profile) => {
          return (
            <ProfileCard
              key={profile.id}
              avatar={profile.avatar}
              firstName={profile.first_name}
              lastName={profile.last_name}
            />
          );
        })}

        {isFetching && nextPage && <ProfileLoadingCard number={5} />}
        {!nextPage && <h4>..... you have reached end of the feed .....</h4>}
      </div>
    );
  }
}

export default App;
