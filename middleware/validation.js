export function existcheck(cimin, evin, leirasin, zsanerin) {
  return cimin && evin && leirasin && zsanerin;
}

export function uplofilmsearchinputcheck(cimin, evin, leirasin, zsanerin) {
  if (
    !cimin.match(/[A-Za-z0-9]*/) ||
    !leirasin.match(/[A-Za-z0-9]*/) ||
    !evin.match(/[0-9]*/) ||
    !zsanerin.match(/[A-Za-z]*/)
  ) {
    return false;
  }
  return true;
}

export function existcheckSearch(cimin, zsanerin, evmin, evmax) {
  return cimin && zsanerin && evmin && evmax;
}

export function existcheckimage(image) {
  return image;
}

export function searchinputcheck(cimin, leirasin, evmin, evmax) {
  if (
    !cimin.match(/[A-Za-z0-9]*/) ||
    !leirasin.match(/[A-Za-z0-9]*/) ||
    !evmin.match(/[0-9]*/) ||
    !evmax.match(/[0-9]*/) ||
    evmin > evmax
  ) {
    return false;
  }
  return true;
}

export function archeck(currentEv, minEv, maxEv) {
  if (currentEv > minEv && currentEv < maxEv) {
    return true;
  }
  return false;
}

export function namechecker(a, cims, b, zsaners) {
  return a === cims && b === zsaners;
}

export function usercheckReg(nev, szerep) {
  if (!nev.match(/[A-Za-z]*/) || (szerep !== 'admin' && szerep !== 'user')) {
    return false;
  }
  return true;
}

export function usercheckLogin(nev) {
  if (!nev.match(/[A-Za-z]*/)) {
    return false;
  }
  return true;
}
