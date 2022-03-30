const express = require('express');
const router = express.Router();

const Classroom = require('../models').classrooms;
// const Student = require('../models').student;

// get all classrooms
router.get('/', (req, res) => {
  Classroom.findAll({
    include: [
      {
        association: 'students',
        order: [['createdAt', 'DESC']]
      }
    ],
    order: [['createdAt', 'DESC']]
  })
    .then((classrooms) =>
      res.json({
        classrooms
      })
    )
    .catch((err) =>
      res.json({
        error: err
      })
    );
});

// get classroom by id
router.get('/:id', (req, res) => {
  Classroom.findByPk(req.params.id, {
    include: [
      {
        association: 'students'
      }
    ]
  })
    .then((classroom) =>
      res.json({
        classroom
      })
    )
    .catch((err) => {
      res.json({
        error: err
      });
    });
});

// create a new classroom
router.post('/', (req, res) => {
  Classroom.create(req.body)
    .then((classroom) =>
      res.json({
        classroom
      })
    )
    .catch((err) =>
      res.json({
        error: err
      })
    );
});

// update classrooms
router.put('/:id', (req, res) => {
  Classroom.findByPk(req.params.id)

    .then((classroom) => {
      classroom
        .update(req.body)

        .then((updatedClassroom) =>
          res.json({
            message: 'Classroom updated successfully'
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

// delete classrooms
router.delete('/:id', (req, res) => {
  Classroom.findByPk(req.params.id).then((classroom) => {
    if (!classroom) {
      return res.status(404).send({
        message: 'Classroom not found'
      });
    }
    classroom
      .destroy()
      .then(() =>
        res.json({
          message: 'Classroom deleted successfully'
        })
      )
      .catch((err) =>
        res.json({
          error: err
        })
      );
  });
});

// add student to classroom
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
