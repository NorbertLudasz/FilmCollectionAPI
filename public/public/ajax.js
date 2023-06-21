// import * as dbreviews from '../db/reviewsQuery.js';
// import axios from 'axios';

// eslint-disable-next-line
async function getMessage(filmID) {
  try {
    console.log('getmessage called');
    const fetchresult = await fetch(`/message/${filmID}`);
    if (fetchresult.ok) {
      const jsonresult = await fetchresult.json();
      console.log(jsonresult);
      document.getElementById('elrejtett').innerText = `Zsaner: ${jsonresult.zsaner}, Leiras: ${jsonresult.leiras}`;
    } else {
      document.getElementById('elrejtett').innerText = 'Error: response from fetching message/filmID was not ok';
    }
  } catch (err) {
    console.log(err);
    document.getElementById('elrejtett').innerText = `Error: ${err.message}`;
  }
}

// eslint-disable-next-line
async function reviewdel(reviewid) {
  try {
    console.log('reviewdel eleje');
    const response = await fetch(`/reviewDel/${reviewid}`, { method: 'delete' });
    console.log('reviewDel after await');
    console.log('reviewid');
    console.log(reviewid);
    if (response.ok) {
      document.getElementById(`review${reviewid}`).remove();
    } else {
      document.getElementById('delreviewmessage').innerText =
        'Error: response from fetching reviewDel/reviewid was not ok';
    }
  } catch (err) {
    // ird ki hogy hiba volt kepernyore is
    console.log(err);
    document.getElementById('delreviewmessage').innerText = `Error: ${err.message}`;
  }
}

// eslint-disable-next-line
async function reviewtempdel(reviewid) {
  try {
    console.log('reviewtempdel eleje');
    const response = await fetch(`/reviewtempDel/${reviewid}`, { method: 'delete' });
    console.log('reviewtempDel after await');
    console.log('reviewid');
    console.log(reviewid);
    if (response.ok) {
      document.getElementById(`reviewtemp${reviewid}`).remove();
    } else {
      document.getElementById('delreviewtempmessage').innerText =
        'Error: response from fetching reviewtempDel/reviewid was not ok';
    }
  } catch (err) {
    // ird ki hogy hiba volt kepernyore is
    console.log(err);
    document.getElementById('delreviewtempmessage').innerText = `Error: ${err.message}`;
  }
}

// eslint-disable-next-line
async function filmdel(filmid) {
  try {
    console.log('filmdel eleje');
    const response = await fetch(`/filmDel/${filmid}`, { method: 'delete' });
    console.log('filmDel after await');
    console.log('filmid');
    console.log(filmid);
    if (response.ok) {
      document.getElementById(`film${filmid}`).remove();
    } else {
      document.getElementById('delfilmmessage').innerText = 'Error: response from fetching filmDel/filmid was not ok';
    }
  } catch (err) {
    // ird ki hogy hiba volt kepernyore is
    console.log(err);
    document.getElementById('delfilmmessage').innerText = `Error: ${err.message}`;
  }
}

// eslint-disable-next-line
async function setadmin(userid){
  try {
    console.log('setadmin eleje');
    const fetchresult = await fetch(`/setadmin/${userid}`);
    if (fetchresult.ok) {
      const jsonresult = await fetchresult.json();
      console.log(jsonresult);
      document.getElementById(
        'roleupdatedmsg',
      ).innerText = `Updated role for: ${jsonresult.nev}, they are now: ${jsonresult.szerep}`;
    } else {
      document.getElementById('roleupdatedmsg').innerText = 'Error: response from fetching setadmin/userid was not ok';
    }
  } catch (err) {
    console.log(err);
    document.getElementById('roleupdatedmsg').innerText = `Error: ${err.message}`;
  }
}

// eslint-disable-next-line
async function setnotadmin(userid){
  try {
    console.log('setnotadmin eleje');
    const fetchresult = await fetch(`/setnotadmin/${userid}`);
    if (fetchresult.ok) {
      const jsonresult = await fetchresult.json();
      console.log(jsonresult);
      document.getElementById(
        'roleupdatedmsg',
      ).innerText = `Updated role for: ${jsonresult.nev}, they are now: ${jsonresult.szerep}`;
    } else {
      document.getElementById('roleupdatedmsg').innerText =
        'Error: response from fetching setnotadmin/userid was not ok';
    }
  } catch (err) {
    console.log(err);
    document.getElementById('roleupdatedmsg').innerText = `Error: ${err.message}`;
  }
}
