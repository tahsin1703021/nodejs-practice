const { handleReqRes } = require("../../helpers/handleReqRes");
const data = require("../../lib/data");
const { hash } = require("../../helpers/utilities");
const { parseJSON } = require("../../helpers/utilities");

//module scaffolding
const handler = {};

//functions
handler.userHandler = (requestProperties, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"];
  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._users[requestProperties.method](requestProperties, callback);
  } else {
    callback(405); //not allow request
  }
};

handler._users = {};

handler._users.get = (requestProperties, callback) => {
  const phone =
    typeof requestProperties.queryStringObject.phone === "string" &&
    requestProperties.queryStringObject.phone.trim().length > 1
      ? requestProperties.queryStringObject.phone
      : false;

  if (phone) {
    data.read("users", phone, (err, u) => {
      const user = { ...parseJSON(u) };
      console.log(user);
      if (!err && user) {
        delete user.password;
        callback(200, user);
      } else {
        callback(404, {
          message: "Couldnt find the user",
        });
      }
    });
  } else {
    callback(404, {
      message: "Couldnt find the user",
    });
  }
};

handler._users.post = (requestProperties, callback) => {
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;

  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;

  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length > 1
      ? requestProperties.body.phone
      : false;

  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  const tosAgreement =
    typeof requestProperties.body.tosAgreement === "boolean"
      ? requestProperties.body.tosAgreement
      : false;

  if (firstName && lastName && phone && tosAgreement && password) {
    data.read("uers", phone, (err, user) => {
      if (err) {
        let userObject = {
          firstName,
          lastName,
          phone,
          tosAgreement,
          password: hash(password),
        };

        data.create("users", phone, userObject, (err2) => {
          if (!err2) {
            callback(200, {
              message: "Successfully created user",
            });
          } else {
            callback(500, {
              error: "Could not create user",
            });
          }
        });
      } else {
        callback(500, {
          error: "Problem in server side",
        });
      }
    });
  } else {
    callback(400, {
      error: "You have a problem in your request",
    });
  }
};

handler._users.put = (requestProperties, callback) => {

  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length > 1
      ? requestProperties.body.phone
      : false;

  console.log(phone);
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;

  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;

  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  if (phone) {
    if (firstName || lastName || password) {
      data.read("users", phone, (err, userdata) => {

        const userDat = parseJSON(userdata);
        const userData = {...userDat};
        console.log(userData);

        if (!err && userData) {
          if (firstName) {
            userData.firstName = firstName;
          }
          if (lastName) {
            userData.lastName = firstName;
          }
          if (password) {
            userData.password = hash(password);
          }

          data.update("users", phone, userData, (err2) => {
            if (!err2) {
              callback(200, {
                message: "Úser updated successfully",
              });
            } else {
              callback(500, {
                error: "Úser update unsuccessfull",
              });
            }
          });
        } else {
          callback(400, {
            error: "Problem in request!",
          });
        }
      });
    } else {
      callback(400, {
        error: "Problem with the request!",
      });
    }
  } else {
    callback(400, {
      error: "Ivalid phone number!",
    });
  }
};

handler._users.delete = (requestProperties, callback) => {};

module.exports = handler;
