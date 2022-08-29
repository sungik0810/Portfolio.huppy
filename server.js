const express = require("express");
var cors = require("cors");
const path = require("path");
const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const fs = require("fs");
const makeFolder = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

var moment = require("moment");

require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

var flash = require("connect-flash");
app.use(
  session({ secret: "비밀코드", resave: true, saveUninitialized: false })
);
const jwt = require("jsonwebtoken");
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "salt_front/build")));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
var ObjectId = require("mongodb").ObjectId;

const { filterObjFunction, comparePasswordFuction } = require("./functions");

const filterObj = filterObjFunction();
const comparePassword = comparePasswordFuction();

const MongoClient = require("mongodb").MongoClient;
var db;
MongoClient.connect(
  "mongodb+srv://bremen:bremen0720@cluster0.oj8smrb.mongodb.net/Salt?retryWrites=true&w=majority",
  { useUnifiedTopology: true },
  function (error, client) {
    if (error) return console.log(error);

    db = client.db("Salt");

    app.listen(8080, function () {
      console.log("listening on 8080");
    });
  }
);

//login
const SECRET_KEY = "secret_key";

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/loginAPI",
    failureRedirect: "/fail",
    failureFlash: true,
  })
);

app.get("/fail", (req, res) => {
  var fmsg = req.flash();
  var feedback = "";
  if (fmsg.error) {
    feedback = fmsg.error[0];
    res.status(200).json(feedback);
  }
});

app.get("/loginAPI", logedIn, function (req, res) {
  if (req.user) {
    const userData = filterObj(req.user, function (key, value) {
      return key !== "pw" && key !== "_id";
    });
    const tokenData = { ...userData };
    tokenData.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365;
    const token = jwt.sign(tokenData, SECRET_KEY);
    res.status(200).json({ ok: true, user: userData, token: token });
  }
});

function logedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.status(200).json({ login: "not login" });
  }
}

passport.use(
  new LocalStrategy(
    {
      usernameField: "id",
      passwordField: "pw",
      session: true,
      passReqToCallback: false,
    },
    function (username, userpassword, done) {
      db.collection("login").findOne(
        { id: username },
        async function (err, user) {
          if (err) return done(err);

          if (!user)
            return done(null, false, { message: "존재하지않는 아이디입니다" });

          if (await comparePassword(userpassword, user.pw)) {
            return done(null, user, { message: "Welcome" });
          } else {
            return done(null, false, { message: "비밀번호가 틀렸습니다" });
          }
        }
      );
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (userId, done) {
  db.collection("login").findOne({ id: userId }, function (error, result) {
    done(null, result);
  });
});

// 자동 로그인
app.post("/checkToken", (req, res) => {
  const token = req.body.token;
  const result = jwt.verify(token, SECRET_KEY);
  if (!result) return res.status(404);
  db.collection("login").findOne({ id: result.id }, (err, user) => {
    if (err) return res.status(404).json({ ok: false, error: err });
    const userData = filterObj(user, function (key, value) {
      return key !== "pw";
    });
    if (user) return res.status(200).json({ ok: true, user: userData });
  });
});

// 회원가입
app.post("/registerAPI", function (req, res) {
  db.collection("login").findOne(
    { id: req.body.id },
    async function (error, result) {
      const pw = await bcrypt.hash(req.body.pw, saltRounds);
      if (result !== null) {
        res.status(200).json({ registerMSG: "사용 중인 ID입니다" });
      } else {
        db.collection("login").findOne(
          { nickName: req.body.nickName },
          function (error, result) {
            if (result !== null) {
              res.status(200).json({ registerMSG: "사용 중인 닉네임입니다" });
            } else if (req.body.pw !== req.body.pwCheck) {
              res
                .status(200)
                .json({ registerMSG: "비밀번호를 다시 확인해주세요" });
            } else {
              db.collection("login").insertOne(
                {
                  id: req.body.id,
                  nickName: req.body.nickName,
                  pw: pw,
                  profilePhoto: "default.png",
                  todayPhoto: 0,
                  likePeople: [],
                  commentPeople: [],
                },
                function (error, result) {
                  res.status(200).json({ registerMSG: "가입성공" });

                  console.log("회원가입 성공");
                }
              );
            }
          }
        );
      }
    }
  );
});

//이미지 저장
let multer = require("multer");
// 공유 사진
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dateString = moment().format("YYYYMMDD");
    makeFolder(`./public/userimage/${dateString}`);
    cb(null, `./public/userimage/${dateString}`);
  },
  filename: function (req, file, cb) {
    const timeSort = new Date().getTime();
    cb(null, `huppy_${timeSort}`);
  },
});
var upload = multer({ storage: storage });

app.get("/peoplephoto", (req, res) => {
  const dateString = moment().format("YYYYMMDD");
  db.collection("UserImage")
    .find({ date: dateString })
    .sort({ num: -1 })
    .toArray((error, result) => {
      res.status(200).json(result);
    });
});

app.post("/personphoto", (req, res) => {
  // const dateString = moment().format('YYYYMMDD')
  if (req.body.user) {
    db.collection("UserImage")
      .find({ id: req.body.user.id })
      .sort({ num: -1 })
      .toArray((error, result) => {
        res.status(200).json(result);
      });
  }
});

app.post("/upload", upload.single("myImg"), (req, res) => {
  const dateString = moment().format("YYYYMMDD");
  const timeString = moment().format("YYYY-MM-DD hh:mm:ss");
  const timeSort = new Date().getTime();
  if (req.file && req.body) {
    db.collection("UserImage").insertOne(
      {
        id: req.body.userId,
        nickName: req.body.userNickName,
        date: dateString,
        time: timeString,
        filename: req.file.filename,
        userProfile: req.body.userProfile,
        num: timeSort,
        like: [],
        comment: [],
      },
      function (error, result) {
        db.collection("login").updateOne(
          { id: req.body.userId },
          { $set: { todayPhoto: 1 } }
        );
      }
    );
    res.status(200).json("업로드 완료");
  }
});

app.get("/userimage/:imageName", (req, res) => {
  const dateString = moment().format("YYYYMMDD");
  res.sendFile(
    __dirname + `/public/userimage/${dateString}/` + req.params.imageName
  );
});

// 프로필사진
var profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/profileimage");
  },
  filename: function (req, file, cb) {
    const timeSort = new Date().getTime();
    cb(null, `huppy_profile_${timeSort}`);
  },
});

var profileUpload = multer({ storage: profileStorage });

// 프로필 사진 서버
app.get("/profile/:imageName", (req, res) => {
  res.sendFile(__dirname + "/public/profileimage/" + req.params.imageName);
});

//프로필 사진 수정 && user데이터베이스 업데이트 && 토큰 재발행
app.post("/profile/upload", profileUpload.single("myProfile"), (req, res) => {
  const USER = JSON.parse(req.body.user);
  if (req.file && USER) {
    db.collection("login").updateOne(
      { id: USER.id },
      { $set: { profilePhoto: req.file.filename } },
      function (error, result) {
        const userData = filterObj(USER, function (key, value) {
          return key !== "check";
        });
        userData.profilePhoto = req.file.filename;
        const tokenData = { ...userData };
        tokenData.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365;
        const token = jwt.sign(tokenData, SECRET_KEY);
        res.status(200).json({ ok: true, user: userData, token: token });
        console.log("프로필 사진 업데이트 완료 후 토큰 전송");
      }
    );
  }
});

app.get("/profilephoto", (req, res) => {
  if (req.user) {
    db.collection("profileImage")
      .find({ id: req.user.id })
      .sort({ num: -1 })
      .toArray((error, result) => {
        res.status(200).json(result);
      });
  }
});

// 좋아요기능
app.post("/like", (req, res) => {
  const dateString = moment().format("YYYYMMDD");
  const timeSort = new Date().getTime();
  db.collection("UserImage").findOne(
    { _id: ObjectId(req.body.postNum) },
    (error, result) => {
      if (error) return console.log(error);
      if (result) {
        if (result.like.indexOf(req.body.user.id) == -1) {
          // 좋아요하면 계정 정보에 알람추가
          db.collection("login").updateOne(
            { id: result.id },
            {
              $push: {
                likePeople: {
                  label: "like",
                  post_id: req.body.postNum,
                  user_id: req.body.user.id,
                  user_nickName: req.body.user.nickName,
                  user_profile: req.body.user.profile,
                  num: timeSort,
                },
              },
            },
            (error, result) => {
              if (error) console.log(error);
              // if (result) console.log(result);
            }
          );
          // 게시글에 좋아요하면 게시글에 좋아요 추가
          db.collection("UserImage").updateOne(
            { _id: ObjectId(result._id) },
            { $set: { like: [...result.like, req.body.user.id] } },
            (error, result) => {
              if (error) {
                console.log(error);
                return res.status(404).json(error);
              }
              if (result) {
                db.collection("UserImage").findOne(
                  { _id: ObjectId(req.body.postNum) },
                  (error, result) => {
                    if (error) {
                      console.log(error);
                      return res.status(404).json(error);
                    }
                    if (result) {
                      console.log("좋아요 추가");
                      return res
                        .status(200)
                        .json({ _id: result._id, like: result.like });
                    }
                  }
                );
              }
            }
          );
        } else {
          // 게시글에 좋아요 취소하면 알람 삭제
          db.collection("login").findOne({ id: result.id }, (error, result) => {
            if (error) console.log(error);
            if (result) {
              const already = [...result.likePeople];
              const findFilter = already.filter((likePeopleList) => {
                return (
                  likePeopleList.post_id === req.body.postNum &&
                  likePeopleList.user_id === req.body.user.id
                );
              });
              const removeFilter = already.filter((likePeopleList) => {
                return (
                  likePeopleList.post_id == req.body.postNum &&
                  likePeopleList.user_id !== req.body.user.id
                );
              });
              if (result.likePeople.indexOf(...findFilter) >= 0) {
                db.collection("login").updateOne(
                  { id: result.id },
                  {
                    $set: { likePeople: removeFilter },
                  }
                );
              }
            }
          });
          // 게시글에 좋아요했을때 있으면 게시글 db에 좋아요 취소
          db.collection("UserImage").updateOne(
            { _id: ObjectId(result._id) },
            {
              $set: {
                like: [
                  ...result.like.filter((a) => {
                    return a !== req.body.user.id;
                  }),
                ],
              },
            },
            (error, result) => {
              if (error) {
                console.log(error);
                return res.status(404).json(error);
              }
              if (result) {
                if (result) {
                  db.collection("UserImage").findOne(
                    { _id: ObjectId(req.body.postNum) },
                    (error, result) => {
                      if (error) {
                        console.log(error);
                        return res.status(404).json(error);
                      }
                      if (result) {
                        console.log("좋아요 제거");
                        return res
                          .status(200)
                          .json({ _id: result._id, like: result.like });
                      }
                    }
                  );
                }
              }

              // res.status(200).json({})
            }
          );
        }
      }
    }
  );
});
// process.on("uncaughtException", (err) => {
// 댓글 기능
app.post("/comment/upload", (req, res) => {
  const dateString = moment().format("YYYYMMDD");
  const timeString = moment().format("YYYY-MM-DD hh:mm:ss");
  const timeSort = new Date().getTime();
  db.collection("UserImage").updateOne(
    { _id: ObjectId(req.body.post._id) },
    {
      $push: {
        comment: {
          comment_id: ObjectId(),
          user_id: req.body.id,
          user_nickName: req.body.nickName,
          comment: req.body.comment,
          time: timeString,
          num: timeSort,
        },
      },
    },
    (error, result) => {
      if (error) console.log("댓글 업로드 실패");
      if (result) {
        console.log("댓글 업로드 성공");
        db.collection("UserImage").findOne(
          { _id: ObjectId(req.body.post._id) },
          (error, result) => {
            if (error) {
              console.log("댓글 업로드 후 불러오기 실패");
            }
            if (result) {
              db.collection("login").updateOne(
                { id: req.body.post.id },
                {
                  $push: {
                    commentPeople: {
                      label: "comment",
                      post_id: req.body.post._id,
                      user_id: req.body.id,
                      user_nickName: req.body.nickName,
                      user_profile: req.body.profile,
                      comment: req.body.comment,
                      num: timeSort,
                    },
                  },
                }
              );
              console.log("댓글 업로드 후 불러오기 성공");
              return res.status(200).json(result.comment);
            }
          }
        );
      }
    }
  );
});

app.post("/alarm/comment/upload", (req, res) => {
  const timeSort = new Date().getTime();
  db.collection("login").updateOne(
    { id: req.body.post.id },
    {
      $push: {
        commentPeople: {
          label: "comment",
          post_id: req.body.post._id,
          user_id: req.body.id,
          user_nickName: req.body.nickName,
          user_profile: req.body.profile,
          comment: req.body.comment,
          num: timeSort,
        },
      },
    }
  );
});

app.get("/comment/read/:id", (req, res) => {
  db.collection("UserImage").findOne(
    { _id: ObjectId(req.params.id) },
    (error, result) => {
      if (error) {
        console.log("댓글 불러오기 실패");
      }
      if (result) {
        console.log("댓글 읽어오기 성공");
        res.status(200).json(result.comment);
      }
    }
  );
});

// 시간
app.get("/timer", (req, res) => {
  function timer() {
    const time = new Date();
    let getHour = String(time.getHours()).padStart(2, "0");
    let getMinute = String(time.getMinutes()).padStart(2, "0");
    let getSecond = String(time.getSeconds()).padStart(2, "0");
    const timerHours = `${23 - parseInt(getHour)}`.padStart(2, "0");
    const timerMinutes = `${59 - parseInt(getMinute)}`.padStart(2, "0");
    const timerSeconds = `${59 - parseInt(getSecond)}`.padStart(2, "0");
    const extraTimer = `${timerHours} : ${timerMinutes} : ${timerSeconds}`;
    return extraTimer;
  }
  const tt = timer();
  if (tt === "") {
    return res.status(500).json({ error: "error!!!" });
  } else {
    return res.status(200).json({ time: tt });
  }
});
//00 : 00 : 01 되면 todayPhoto 초기화
function timer() {
  const time = new Date();
  let getHour = String(time.getHours()).padStart(2, "0");
  let getMinute = String(time.getMinutes()).padStart(2, "0");
  let getSecond = String(time.getSeconds()).padStart(2, "0");
  const timerHours = `${23 - parseInt(getHour)}`.padStart(2, "0");
  const timerMinutes = `${59 - parseInt(getMinute)}`.padStart(2, "0");
  const timerSeconds = `${59 - parseInt(getSecond)}`.padStart(2, "0");
  const extraTimer = `${timerHours} : ${timerMinutes} : ${timerSeconds}`;
  return extraTimer;
}
setInterval(() => {
  const tt = timer();
  if (tt === "00 : 00 : 01") {
    db.collection("login").updateOne(
      { id: req.params.id },
      { $set: { todayPhoto: 0 } }
    );
  }
}, 1000);

// 댓글달면 알람
app.post("/alarm/comment/upload", (req, res) => {
  const timeSort = new Date().getTime();
  db.collection("login").updateOne(
    { id: req.body.post.id },
    {
      $push: {
        commentPeople: {
          label: "comment",
          post_id: req.body.post._id,
          user_id: req.body.id,
          user_nickName: req.body.nickName,
          user_profile: req.body.profile,
          comment: req.body.comment,
          num: timeSort,
        },
      },
    }
  );
});

app.get("/alarm/get/:id", (req, res) => {
  const user_id = req.params.id;
  db.collection("login").findOne({ id: user_id }, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(404).json(error);
    }
    if (result) {
      // console.log(result)
      return res.status(200).json({
        like_alarm: result.likePeople,
        comment_alarm: result.commentPeople,
      });
    }
  });
});

app.post("/alarm/like/delete", (req, res) => {
  db.collection("login").findOne({ id: req.body.user.id }, (error, result) => {
    if (error) console.log(error);
    if (result) {
      const already = [...result.likePeople];
      const findFilter = already.filter((likePeopleList) => {
        return (
          likePeopleList.post_id === req.body.target.post_id &&
          likePeopleList.user_id === req.body.target.user_id
        );
      });
      const removeFilter = already.filter((likePeopleList) => {
        return (
          likePeopleList.post_id == req.body.target.post_id &&
          likePeopleList.user_id !== req.body.target.user_id
        );
      });
      if (result.likePeople.indexOf(...findFilter) >= 0) {
        db.collection("login").updateOne(
          { id: result.id },
          {
            $set: { likePeople: removeFilter },
          },
          (error, result) => {
            if (error) console.log(error);
            if (result) {
              const user_id = req.body.user.id;
              db.collection("login").findOne(
                { id: user_id },
                (error, result) => {
                  if (error) {
                    console.log(error);
                    return res.status(404).json(error);
                  }
                  if (result) {
                    // console.log(result)
                    return res.status(200).json({
                      like_alarm: result.likePeople,
                      comment_alarm: result.commentPeople,
                    });
                  }
                }
              );
            }
          }
        );
      }
    }
  });
});
app.post("/alarm/comment/delete", (req, res) => {
  // console.log(req.body.target.comment);
  db.collection("login").findOne({ id: req.body.user.id }, (error, result) => {
    if (error) console.log(error);
    if (result) {
      const already = [...result.commentPeople];
      const findFilter = already.filter((commentPeopleList) => {
        return (
          commentPeopleList.post_id === req.body.target.post_id &&
          commentPeopleList.user_id === req.body.target.user_id &&
          commentPeopleList.num === req.body.target.num
        );
      });
      // console.log(findFilter);
      const removeFilter = already.filter((commentPeopleList) => {
        // console.log(findFilter);
        return [commentPeopleList][0] !== findFilter[0];
      });
      // console.log(removeFilter);
      if (result.commentPeople.indexOf(...findFilter) >= 0) {
        db.collection("login").updateOne(
          { id: result.id },
          {
            $set: { commentPeople: removeFilter },
          },
          (error, result) => {
            if (error) console.log(error);
            if (result) {
              const user_id = req.body.user.id;
              db.collection("login").findOne(
                { id: user_id },
                (error, result) => {
                  if (error) {
                    console.log(error);
                    return res.status(404).json(error);
                  }
                  if (result) {
                    // console.log(result)
                    return res.status(200).json({
                      like_alarm: result.likePeople,
                      comment_alarm: result.commentPeople,
                    });
                  }
                }
              );
            }
          }
        );
      }
    }
  });
});

//좋아요하면 알람
// process.on("uncaughtException", (err) => {

//   console.error("서버 사망했을때 다시 킴");
//   console.error(err);
//   process.exit(1);
// });

// 메세지 남기기
app.post("ToHuppy", (req, res) => {
  // db.collection('ToHuppy').in
});
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "salt_front/build/index.html"));
});
