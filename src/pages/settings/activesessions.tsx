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
          // Success
        },
        function (error) {
          // Failure
        }
      )
      .finally(() => {
        setLoadingActiveSessions(false);
      });
  }, []);

  if (loadingActiveSessions) {
    return <Loader />;
  }

  return <div>A</div>;
};

export default Activesessions;
