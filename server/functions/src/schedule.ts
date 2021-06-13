import * as functions from 'firebase-functions';
import axios from 'axios';

export const schedule = functions.https.onRequest(async (request, response) => {
  const res = await axios.get(
    'https://api.collegefootballdata.com/games?year=2021&seasonType=regular',
    {
      headers: {
        Authorization: functions.config().cfdb.key,
      },
    }
  );
  const data = await res.data();
  response.send({ data });
});
