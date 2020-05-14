const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const CalendarsController = require('../controllers/calendar');

router.get('/', checkAuth, CalendarsController.calendar_get_data);

router.get('/get/id/:calendarId', checkAuth, CalendarsController.calendar_get_data_by_id);

router.post('/post', checkAuth, CalendarsController.calendar_post_data);

router.delete('/delete/id/:calendarId', checkAuth, CalendarsController.calendar_delete_data);

router.patch('/patch/id/:calendarId', checkAuth, CalendarsController.calendar_patch_data);

router.put('/put/id/:calendarId', checkAuth, CalendarsController.calendar_update_data);


module.exports = router;