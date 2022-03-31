const express = require('express');
const router = express.Router();

const Lecture = require('../models').lectures;

// get all lectures
router.get('/', (req, res) => {
  Lecture.findAll({})
    .then((lectures) =>
      res.json({
        lectures
      })
    )
    .catch((err) =>
      res.json({
        error: err
      })
    );
});

// get lecture by id
router.get('/:id', (req, res) => {
  Lecture.findByPk(req.params.id, {})
    .then((lecture) => {
      if (!lecture) {
        return res.status(404).json({
          message: 'Lecture not found'
        });
      }
      res.json({
        lecture
      });
    })
    .catch((err) => {
      res.json({
        error: err
      });
    });
});

// create a new Lecture
router.post('/', (req, res) => {
  Lecture.create(req.body)
    .then((lecture) =>
      res.json({
        lecture
      })
    )
    .catch((err) =>
      res.json({
        error: err
      })
    );
});

// update lecture by id
router.put('/:id', (req, res) => {
  Lecture.findByPk(req.params.id)
    .then((lecture) => {
      lecture
        .update(req.body)
        .then(() =>
          res.json({
            message: 'Lecture updated successfully'
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

// delete lecture by id
router.delete('/:id', (req, res) => {
  Lecture.findByPk(req.params.id).then((lecture) => {
    if (!lecture) {
      return res.status(404).send({
        message: 'Lecture not found'
      });
    }
    lecture
      .destroy()
      .then(() =>
        res.json({
          message: 'Lecture deleted successfully'
        })
      )
      .catch((err) =>
        res.json({
          error: err
        })
      );
  });
});

// add lecture to a course
router.post('/add/course', (req, res) => {
  Lecture.create(
    {
      name: req.body.name,
      course: req.body.course
    },
    {
      include: [
        {
          association: 'course'
        }
      ]
    }
  )
    .then((lecture) => {
      res.json({
        lecture
      });
    })
    .catch((err) => {
      res.json({
        error: err
      });
    });
});

module.exports = router;
