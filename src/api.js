import mockData from './mock-data';
import axios from 'axios';
import NProgress from 'nprogress';


const removeQuery = () => {
  if (window.history.pushState && window.location.pathname) {
    let newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    let newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

export const checkToken = async (accessToken) => {
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  )
    .then((res) => res.json())
    .catch((error) => error.json());

  return result;
};

export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  var locations = [...new Set(extractLocations)];
  return locations;
};

export const getEvents = async () => {
  NProgress.start();

  if (window.location.href.startsWith("http://localhost")) {
    NProgress.done();
    return mockData;
  }

  // Micol: In case if you go offline, we can use `lastEvents` from localStorage which you set down below
  if (!navigator.onLine) {
    const data = localStorage.getItem('lastEvents');
    NProgress.done();
    return data ? JSON.parse(data).events : [];
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    console.log("About to hit get events...")
    const url = 'https://owpshv4xb0.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/' + token;
    const result = await axios.get(url);
    if (result.data) {
      const locations = extractLocations(result.data.events);
      localStorage.setItem("lastEvents", JSON.stringify(result.data));
      localStorage.setItem("locations", JSON.stringify(locations));
    }
    NProgress.done();
    return result.data.events;
  }
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token'); //slkdfjskd
  const tokenCheck = accessToken && (await checkToken(accessToken)); // response or error

  // const isTokenCheckFailed = tokenCheck && tokenCheck.hasOwnProperty('error');
  // Todo: Check the token valid or not

  console.log("access and token", accessToken, tokenCheck)
  if (!accessToken) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
      const results = await axios.get(
        "https://owpshv4xb0.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
      );
      const { authUrl } = results.data;
      console.log("REDIRECTING......")
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  console.log("Returning acess token")
  return accessToken;
}

const getToken = async (code) => {
  console.log("Setting access_token to LS")
  const encodeCode = encodeURIComponent(code);
  const { access_token } = await fetch(
    'https://owpshv4xb0.execute-api.eu-central-1.amazonaws.com/dev/api/token/' + encodeCode
  )
    .then((res) => {
      return res.json();
    })
    .catch((error) => error);

  access_token && localStorage.setItem("access_token", access_token);

  return access_token;
};