const express = require('express');
const router = express.Router();

const Course = require('../models').courses;

// get all courses
router.get('/', (req, res) => {
  Course.findAll({
    include: [
      {
        association: 'lectures'
      }
    ]
  })
    .then((courses) =>
      res.json({
        courses
      })
    )
    .catch((err) =>
      res.json({
        error: err
      })
    );
});

// get course by id
router.get('/:id', (req, res) => {
  Course.findByPk(req.params.id, {
    include: [
      {
        association: 'lectures'
      }
    ]
  })
    .then((course) => {
      if (!course) {
        return res.status(404).json({
          message: 'Course not found'
        });
      }
      res.json({
        course
      });
    })
    .catch((err) => {
      res.json({
        error: err
      });
    });
});

// create a new Course
router.post('/', (req, res) => {
  Course.create(req.body)
    .then((course) =>
      res.json({
        course
      })
    )
    .catch((err) =>
      res.json({
        error: err
      })
    );
});

// update course by id
router.put('/:id', (req, res) => {
  Course.findByPk(req.params.id)
    .then((course) => {
      course
        .update(req.body)
        .then(() =>
          res.json({
            message: 'Course updated successfully'
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

// delete course by id
router.delete('/:id', (req, res) => {
  Course.findByPk(req.params.id).then((course) => {
    if (!course) {
      return res.status(404).send({
        message: 'Course not found'
      });
    }
    course
      .destroy()
      .then(() =>
        res.json({
          message: 'Course deleted successfully'
        })
      )
      .catch((err) =>
        res.json({
          error: err
        })
      );
  });
});

module.exports = router;
