const express = require('express');
const router = express.Router();

const classroomRouter = require('./classroom');
const studentRouter = require('./student');
const lectureRouter = require('./lecture');
const courseRouter = require('./course');

router.use('/classrooms', classroomRouter);
router.use('/students', studentRouter);
router.use('/lectures', lectureRouter);
router.use('/courses', courseRouter);

module.exports = router;
