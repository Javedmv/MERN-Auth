const express = require('express');
const { adminLogin, getUser, userBlock, userUnblock, editUser, searchUser } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/login').post(adminLogin);
router.route('/').get(protect, getUser);
router.route('/block').post(protect, userBlock)
router.route('/unblock').post(protect, userUnblock)
router.route('/:userId').post(protect, editUser);
router.route('/search',searchUser);


module.exports = router;