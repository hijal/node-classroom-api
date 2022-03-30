const express = require('express');
const router = express.Router();

const Student = require('../models').students;

// get all students
router.get('/', (req, res) => {
  Student.findAll({
    include: [
      {
        association: 'classroom'
      }
    ]
  })
    .then((students) =>
      res.json({
        students
      })
    )
    .catch((err) =>
      res.json({
        error: err
      })
    );
});

// get student by id
router.get('/:id', (req, res) => {
  Student.findByPk(req.params.id, {
    include: [
      {
        association: 'classroom'
      }
    ]
  })
    .then((student) => {
      if (!student) {
        return res.status(404).json({
          message: 'Student not found'
        });
      }
      res.json({
        student
      });
    })
    .catch((err) => {
      res.json({
        error: err
      });
    });
});

// create a new student
router.post('/', (req, res) => {
  Student.create(req.body)
    .then((student) =>
      res.json({
        student
      })
    )
    .catch((err) =>
      res.json({
        error: err
      })
    );
});

// update student by id
router.put('/:id', (req, res) => {
  Student.findByPk(req.params.id)
    .then((student) => {
      student
        .update(req.body)
        .then(() =>
          res.json({
            message: 'Student updated successfully'
          })
        )
        .catch((err) =>
          res.json({
            error: err
          })
        );
    })
    .catch((err) =>
      res.json({
        error: err
      })
    );
});

// delete student by id
router.delete('/:id', (req, res) => {
  Student.findByPk(req.params.id).then((student) => {
    if (!student) {
      return res.status(404).send({
        message: 'Student not found'
      });
    }
    student
      .destroy()
      .then(() =>
        res.json({
          message: 'Student deleted successfully'
        })
      )
      .catch((err) =>
        res.json({
          error: err
        })
      );
  });
});

//Executing (default): INSERT INTO `classrooms` (`id`,`name`,`createdAt`,`updatedAt`) VALUES (DEFAULT,?,?,?);
//Executing (default): INSERT INTO `students` (`id`,`classroomId`,`name`,`createdAt`,`updatedAt`) VALUES (DEFAULT,?,?,?,?);
//Executing (default): INSERT INTO `courses` (`id`,`lectureId`,`name`,`createdAt`,`updatedAt`) VALUES (DEFAULT,?,?,?,?);
//Executing (default): INSERT INTO `student-courses` (`studentId`,`courseId`,`createdAt`,`updatedAt`) VALUES (?,?,?,?);

// student add to course
router.post('/add/course', (req, res) => {
  Student.create(
    {
      name: req.body.name,
      classroom: req.body.classroom,
      courses: req.body.courses
    },
    {
      include: [
        {
          association: 'classroom'
        },
        {
          association: 'courses'
        }
      ]
    }
  )
    .then((student) => {
      res.json({
        student
      });
    })
    .catch((err) =>
      res.json({
        error: err
      })
    );
});

module.exports = router;
