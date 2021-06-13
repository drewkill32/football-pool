import * as functions from 'firebase-functions';

import axios from 'axios';

const getSearchParams = (tbd: any) => {
  const isURLSearchParams = (tbd: any): tbd is URLSearchParams => {
    return true;
  };
  if (isURLSearchParams(tbd)) {
    return tbd;
  }
  return new URLSearchParams({
    year: '2020',
  });
};

export const schedule = functions.https.onRequest(async (request, response) => {
  var urlParams = getSearchParams(request.query);
  console.log({ query: request.query, urlParams, str: urlParams.toString() });
  const obj = {
    prop1: 'hi there',
    prop2: '100%',
  };
  const params = new URLSearchParams(obj).toString();
  console.log(params);
  const res = await axios.get(
    `https://api.collegefootballdata.com/games?${urlParams.toString}`,
    {
      headers: {
        Authorization:
          'Bearer 0BxU+G23e88DJ9BtcaJDJ2cqpR3Bs26CUMcItUntilpFUvQj4Zjgm7TznKjEMXvd',
      },
    }
  );
  const data = await res.data;
  response.send({ data });
});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true });

  response.send('Hello from Firebase2!');
});
