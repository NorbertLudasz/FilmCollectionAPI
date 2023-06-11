// import * as dbreviews from '../db/reviewsQuery.js';

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
