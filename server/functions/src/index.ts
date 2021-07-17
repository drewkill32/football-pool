import * as functions from 'firebase-functions';
import axios from 'axios';

export const teams = functions.https.onRequest(async (request, response) => {
  const urlParams = toURLSearchParams(request.query);
  const { data } = await getFootballData('teams', urlParams);

  response.send(data);
});

export const games = functions.https.onRequest(async (request, response) => {
  const urlParams = toURLSearchParams(request.query);
  const { data } = await getFootballData('games', urlParams);

  response.send(data);
});

export const calendar = functions.https.onRequest(async (request, response) => {
  const urlParams = toURLSearchParams(request.query);
  const { data } = await getFootballData('calendar', urlParams);

  response.send(data);
});
export const conferences = functions.https.onRequest(
  async (request, response) => {
    const urlParams = toURLSearchParams(request.query);
    const { data } = await getFootballData('conferences', urlParams);

    response.send(data);
  }
);

function getFootballData(endPoint: string, params: URLSearchParams) {
  return axios.get(
    `https://api.collegefootballdata.com/${endPoint}?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${functions.config().cfbd.key}`,
      },
    }
  );
}

function toURLSearchParams(params: any) {
  const urlParams = new URLSearchParams();
  for (const item in params) {
    urlParams.append(item, `${params[item]}`);
  }
  return urlParams;
}
