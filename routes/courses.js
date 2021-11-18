const express = require("express");

const User = require("../models/User");
const Course = require("../models/Course");
const Section = require("../models/Section");

const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");

let router = express.Router();

router.get("/allcourses", (req, res) => {
  Course.find({}).then((data) => {
    res.send(data);
  });
});

router.post("/currentcourses", (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .populate({
      path: "courses",
      populate: {
        path: "messages.sender",
        // populate: {
        //     path: "sender"
        // }
      },
    })
    .populate({
      path: "courses",
      populate: {
        path: "sections",
        populate: {
          path: "messages.sender",
        },
        // populate: {
        //     path: "sender"
        // }
      },
    })
    .exec(function (err, user) {
      if (err) {
        console.log(err);
      } else {
        res.send(user?.courses);
      }
    });
});

router.post("/onecourse", (req, res) => {
  Course.findOne(
    {
      crn: req.body.crn,
    },
    function (err, course) {
      if (err) {
        console.log(err);
      } else {
        res.send(course.messages);
      }
    }
  );
});

router.post("/addcourse", (req, res) => {
  User.findOneAndUpdate(
    {
      email: req.body.email,
    },
    {
      $push: {
        courses: req.body.course.course_object._id,
      },
    },
    {
      new: true,
    }
  )
    .then((user) => {
      Course.findOneAndUpdate(
        {
          crn: req.body.course.crn,
        },
        {
          $push: {
            users: user._id,
          },
        },
        {
          new: true,
        }
      )
        .populate({
          path: "messages.sender",
        })
        .exec(function (err, course) {
          if (err) {
            console.log(err);
          } else {
            console.log("%j", course);
            res.send(course);
          }
        });
      //.catch((e) => console.log(e));
      //res.sendStatus(200);
    })
    .catch((e) => console.log(e));
});

router.post("/removecourse", (req, res) => {
  User.findOneAndUpdate(
    {
      email: req.body.email,
    },
    {
      $pull: {
        courses: req.body.course.course_object._id,
      },
    },
    {
      new: true,
    }
  )
    .then((user) => {
      Course.updateOne(
        {
          crn: req.body.course.crn,
        },
        {
          $pull: {
            users: user._id,
          },
        }
      ).catch((e) => console.log(e));
      res.sendStatus(200);
    })
    .catch((e) => console.log(e));
});

router.post("/searchcourses", async (req, res) => {
  try {
    const courseResults = await Course.fuzzySearch(req.body.query);
    res.send(courseResults);
  } catch (e) {
    console.log(e);
  }
});

router.post("/pinpost", (req, res) => {
  Course.updateOne(
    {
      crn: req.body.crn,
    },
    {
      $push: {
        pinnedPosts: req.body.post,
      },
    }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.log(e);
    });
});

router.post("/removepin", (req, res) => {
  console.log(req.body);
  Course.updateOne(
    {
      crn: req.body.crn,
    },
    {
      $pull: {
        pinnedPosts: {
          _id: req.body.id,
        },
      },
    }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.log(e);
    });
});

router.post("/addsection", (req, res) => {
  const sectionObj = req.body.sectionObj;
  const newSection = new Section({
    sectionName: sectionObj.sectionName,
    crn: sectionObj.crn,
    course_title: sectionObj.course_title,
    course_number: sectionObj.course_number,
    subject: sectionObj.subject,
    course_section: sectionObj.course_section,
    users: [],
    messages: [],
    pinnedPosts: [],
  });
  newSection
    .save()
    .then((section) => {
      Course.updateOne(
        {
          crn: req.body.crn,
        },
        {
          $push: {
            sections: section._id,
          },
        },
        function (err, result) {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        }
      );
    })
    .catch((e) => console.log(e));
});

module.exports = router;
