const express = require("express");
const router = express.Router();
const cors = require("cors");
const request = require("request");
const Message = require("../Model/Message");
const moment = require("moment");

require("dotenv").config();
router.use(cors());

router.post("/add_new_message", async (req, res) => {
  const result = req.access;
  result
    .then(authRes => {
      const messageData = {
        user: req.body.user,
        topic: req.body.subject,
        content: req.body.content,
        date: new Date()
      };
      Message.create(messageData)
        .then(result => res.send("200 OK"))
        .catch(e => res.sendStatus(e));
    })
    .catch(e => {
      res.sendStatus(e);
    });
});
router.post("/get_message", async (req, res) => {
  const result = req.access;
  result
    .then(authRes => {
      Message.aggregate([
        {
          $facet: {
            getData: [
              { $match: {} },
              { $sort: { date: -1 } },
              { $skip: req.body.skip },
              { $limit: req.body.limit }
            ],
            totalCount: [
              {
                $group: {
                  _id: null,
                  count: { $sum: 1 }
                }
              }
            ]
          }
        }
      ])
        .then(arr => {
          temp = arr[0].getData;
          temp.map(i => {
            i.date = moment(i.date).format("MMMM Do YYYY, h:mm:ss a");
          });

          res.send({
            result: temp,
            count: arr[0].totalCount[0]
          });
        })
        .catch(e => {
          res.sendStatus(e);
        });
    })
    .catch(e => {
      res.sendStatus(e);
    });
});

module.exports = router;
