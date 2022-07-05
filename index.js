const WebServiceClient = require("@maxmind/geoip2-node").WebServiceClient;

const ACCOUNT_ID = process.env.MAXMIND_ACCOUNT_ID;
const LICENSE_KEY = process.env.MAXMIND_LICENSE_KEY;

const client = new WebServiceClient(ACCOUNT_ID, LICENSE_KEY);

exports.handler = async (event) => {
  const ip = event.rawQueryString.split("=")[1];

  if (!ip) {
    return {
      statusCode: 401,
      body: JSON.stringify("the ip address is required!"),
    };
  }

  try {
    const response = await client.city(ip);

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify("Internal server error"),
    };
  }
};
