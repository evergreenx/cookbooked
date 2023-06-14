import { account } from "@/appwrite/config";
import Loader from "@/components/atoms/Loader";
import React, { useEffect, useState } from "react";

const Activesessions = () => {
  const [loadingActiveSessions, setLoadingActiveSessions] =
    useState<boolean>(false);
  const [activesessions, setActivesessions] = useState<any>([]); // Updated the initial state to null
  useEffect(() => {
    setLoadingActiveSessions(true);
    const promise = account.listSessions();

    promise
      .then(
        function (response) {
          setActivesessions(response);
          console.log(response); // Success
        },
        function (error) {
          console.log(error); // Failure
        }
      )
      .finally(() => {
        setLoadingActiveSessions(false);
      });
  }, []);

  if (loadingActiveSessions) {
    return <Loader />;
  }

  console.log(activesessions);

  return <div>A</div>;
};

export default Activesessions;
