class CookieController {
  constructor() {}

  encodeCookie(payload, key) {
    var payloadEncode = (payload * 231 + 123456).toString();
    var token = payloadEncode + key;
    return token;
  }

  decodeCookie(token) {
    let tokenNum = parseInt(token.slice(0, -7));
    let userID = (tokenNum - 123456) / 231;
    return userID;
  }
}

export default CookieController;
