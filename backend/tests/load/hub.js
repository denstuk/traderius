import http from "k6/http";
import { check, group, sleep } from "k6";

export const options = {
  vus: 5000,
  duration: "60s",
};

const requestOptions = {
  headers: {
    "Content-Type": "application/json",
  },
};

export default function () {
  group("User: Authentication -> Receive News -> Get Analysis", (_) => {
    const loginRequestBody = {
      credential: "highloadtest",
      password: "tpassword",
    };
    const loginResponse = http.post(
      "http://127.0.0.1:9801/api/v1/auth/sign-in",
      JSON.stringify(loginRequestBody),
      requestOptions
    );
    check(loginResponse, {
      "POST /sign-in is status 200": (r) => r.status === 200,
    });

    const newsResponse = http.get(
      "http://127.0.0.1:9801/api/v1/news",
      undefined,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginResponse.body}`,
        },
      }
    );
    check(newsResponse, {
      "GET /news is status 200": (r) => r.status === 200,
    });
  });
}
