const express = require("express");

const User = require("../models/user");

const authMiddleware = require("../middleware/auth");

const sharp = require("sharp");

const router = new express.Router();

const multer = require("multer");
const upload = multer({
  limits: {
    fileSize: 100000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }
    return cb(undefined, true);
  },
});

router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({
      user,
      token,
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({
      user,
      token,
    });
  } catch (e) {
    res.status(400).send();
  }
});
router.post("/users/logout", authMiddleware, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(({ token }) => {
      return token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(400).send();
  }
});
router.post("/users/logoutAll", authMiddleware, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(400).send();
  }
});

router.get("/users/me", authMiddleware, async (req, res) => {
  try {
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});
router.patch("/users/me", authMiddleware, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedKeys = ["name", "age", "email", "password"];
  const isInvalidOperation = !updates.every((key) => allowedKeys.includes(key));

  if (isInvalidOperation) {
    return res.status(400).send({ error: "Invalid Updates" });
  }
  try {
    const { user } = req;
    updates.forEach((update) => {
      user[update] = req.body[update];
    });
    await user.save();

    // const user = await User.findByIdAndUpdate(id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.delete("/users/me", authMiddleware, async (req, res) => {
  try {
    // const { id } = req.user;
    // const user = await User.findByIdAndDelete(id);
    // if (!user) {
    //   return res.status(404).send();
    // }
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post(
  "/users/me/avatar",
  authMiddleware,
  upload.single("avatar"),
  async (req, res) => {
    req.user.avatar = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete(
  "/users/me/avatar",
  authMiddleware,
  async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
router.get(
  "/users/:id/avatar",
  authMiddleware,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user || !user.avatar) {
        throw new Error();
      }

      res.set("Content-Type", "image/jpg");
      res.send(user.avatar);
    } catch (e) {
      res.status(404).send();
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
