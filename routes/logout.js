import router from './mainrouter.js';

router.get('/logout', (req, res) => {
  res.clearCookie('cookie1');
  res.redirect('/');
});

export default router;
