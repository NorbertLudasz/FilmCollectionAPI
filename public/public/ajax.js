// import * as dbreviews from '../db/reviewsQuery.js';

// eslint-disable-next-line
async function getMessage(filmID) {
  try {
    console.log('getmessage called');
    const fetchresult = await fetch(`/message/${filmID}`);
    const jsonresult = await fetchresult.json();
    console.log(jsonresult);
    document.getElementById('elrejtett').innerText = `Zsaner: ${jsonresult.zsaner}, Leiras: ${jsonresult.leiras}`;
  } catch (err) {
    console.log(err);
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
    }
  } catch (err) {
    // ird ki hogy hiba volt kepernyore is
    console.log(err);
  }
}
