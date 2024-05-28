import { wait } from "./timerMethods";
import { ErrorMessage } from "../types/data";

// Details below can be set as part of environment variables, or set as part of server configuration
const mockDataServerUrl = "http://localhost:3000/";
const mockDataFetchRetries = 5;
const mockDataFetchLoadInterval = 1000;

export const fetchData = (
  path: string,
  setError: (value: React.SetStateAction<ErrorMessage>) => void,
  tries = mockDataFetchRetries
) => {
  return new Promise((resolve, reject) => {
    let status: number;
    let text: string;

    const attemptFetch = (tries: number) => {
      fetch(mockDataServerUrl + path)
        .then((res) => {
          status = res.status;
          text = res.statusText;
          return res.json();
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          if (tries > 0) {
            setError({
              status: 202,
              text: 'Loading...  Please wait'
            });
            wait(mockDataFetchLoadInterval).then(() => attemptFetch(tries - 1));
          } else {
            setError({
              status: status,
              text: text,
            });
            reject(err);
          }
        });
    };

    attemptFetch(tries);
  });
};

export const sendRequest = (
  reviewText: string,
  setNotificationMessage: (
    value: React.SetStateAction<string | undefined>
  ) => void,
  handleNotificationOpen: () => void,
  handleClose: () => void,
  tries = mockDataFetchRetries,
) => {
  return new Promise((resolve, reject) => {
    let status: number;
    let text: string;

    const attemptFetch = (tries: number) => {
      fetch(mockDataServerUrl + "submitReview", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: reviewText,
      })
        .then((res) => {
          status = res.status;
          text = res.statusText;
          setNotificationMessage("Review sent.  Thank you for your response!");
          handleNotificationOpen();
          handleClose();
          return res.json();
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          if (tries > 0) {
            wait(mockDataFetchLoadInterval).then(() => attemptFetch(tries - 1));
          } else {
            setNotificationMessage("Error sending review.  Please try again.");
            handleNotificationOpen();
            reject(err);
          }
        });
    };

    attemptFetch(tries);
  });
};
