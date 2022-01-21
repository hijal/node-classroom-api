const express = require('express');
const router = express.Router();

const classroomRouter = require('./classroom');

router.use('/classrooms', classroomRouter);

module.exports = router;
