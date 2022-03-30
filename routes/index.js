const express = require('express');
const router = express.Router();

const classroomRouter = require('./classroom');
const studentRouter = require('./student');
const lectureRouter = require('./lecture');

router.use('/classrooms', classroomRouter);
router.use('/students', studentRouter);
router.use('/lectures', lectureRouter);

module.exports = router;
