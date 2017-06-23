var parseCookies = function () {
  var cookieData = (typeof document.cookie === 'string' ? document.cookie : '').trim();

  return (cookieData ? cookieData.split(';') : []).reduce(function (cookies, cookieString) {
    var cookiePair = cookieString.split('=');

    cookies[cookiePair[0].trim()] = cookiePair.length > 1 ? cookiePair[1].trim() : '';

    return cookies;
  }, {});
};

var getCookie = function (name) {
  return parseCookies()[name] || '';
};

var deleteCookie = function (name) {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

var deleteAllCookies = function () {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
};

var getAllCookiesName = function () {
  var cookies = document.cookie.split(";");
  var cookieNameArray = [];

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    cookieNameArray.push(name.replace(/['"]+/g, ''));
  }
  //console.log(cookieNameArray);
  return cookieNameArray;
};