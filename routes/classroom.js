const express = require('express');
const router = express.Router();

const Classroom = require('../models').classroom;
// const Student = require('../models').student;

router.get('/', (req, res) => {
  Classroom.findAll({
    include: [
      {
        association: 'students',
        order: [['createdAt', 'DESC']]
      }
    ],
    order: [
      ['createdAt', 'DESC']
      // [{ model: Student, as: 'students' }, 'createdAt', 'DESC']
      //   [Classroom.associations.students, 'createdAt', 'DESC']
    ]
  })
    .then((classrooms) => res.json({ classrooms }))
    .catch((err) => res.json({ error: err }));
});

router.get('/:id', (req, res) => {
  Classroom.findByPk(req.params.id, {
    include: [
      {
        association: 'students'
      }
    ]
  })
    .then((classroom) => res.json({ classroom }))
    .catch((err) => {
      res.json({
        error: err
      });
    });
});

router.post('/', (req, res) => {
  Classroom.create(req.body)
    .then((classroom) => res.json({ classroom }))
    .catch((err) => res.json({ error: err }));
});

router.post('/add/students', (req, res) => {
  Classroom.create(
    {
      name: req.body.name,
      students: req.body.students
    },
    {
      include: [
        {
          association: 'students'
        }
      ]
    }
  )
    .then((classroom) => {
      res.json({
        classroom
      });
    })
    .catch((err) =>
      res.json({
        error: err
      })
    );
});

module.exports = router;
