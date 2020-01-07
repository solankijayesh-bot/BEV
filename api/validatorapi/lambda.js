const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.AWS_REGION });

const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
exports.handler = async (event) => {
    console.log('event object: %j',event);
  const aadhar = event.queryStringParameters.aadhar;

  var params = {
    TableName: "masterdata",
    ExpressionAttributeNames: {
      "#aadharNo": "aadhar_no"
    },
    ExpressionAttributeValues: {
      ":aadharNo": aadhar
    },
    FilterExpression: "#aadharNo = :aadharNo"
  };

  try {
    results = await ddb.scan(params).promise();
    console.log(results)
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify(e) };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v1.0! Your function executed successfully!",
        input: results
      },
      null,
      2
    )
  };
};
