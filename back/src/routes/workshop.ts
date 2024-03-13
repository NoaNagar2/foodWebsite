import { Router } from "express";
import { Workshop } from "../database/model/workshop";
import {
  validateParticipant,
  validateWorkshop,
} from "../middleware/validation";
import { extractToken, isAdmin } from "../middleware/is-admin";
import { sendMail } from "../middleware/sendMail";
import { sendMailToAdmin } from "../middleware/sendMailToAdmin";
import nodemailer from "nodemailer";
import { sendMailReminder } from "../middleware/sendMailReminder";

const router = Router();

// get all workshop
router.get("/", async (req, res, next) => {
  try {
    const allWorkshop = await Workshop.find();
    return res.json(allWorkshop);
  } catch (e) {
    next(e);
  }
});

// get workshop by id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("id");

    const workshop = await Workshop.findById(id);
    res.json(workshop);
  } catch (e) {
    next(e);
  }
});

// create workshop
router.post("/", isAdmin, validateWorkshop, async (req, res, next) => {
  try {
    const createWorkshop = new Workshop(req.body as IWorkshop);
    createWorkshop.save();

    res.json(createWorkshop);
  } catch (e) {
    next(e);
  }
});

// edit workshop
router.put("/:id", isAdmin, validateWorkshop, async (req, res, next) => {
  try {
    const _id = req.params.id;

    const workshop = await Workshop.findByIdAndUpdate(_id, req.body);
    workshop.save();

    res.json(workshop);
  } catch (e) {
    next(e);
  }
});

// delete workshop
router.delete("/:id", isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Workshop.findByIdAndDelete(id);
    res.json({ deleted });
  } catch (e) {
    next(e);
  }
});

// Joining and Cancellation to workshop
router.patch("/:id", validateParticipant, async (req, res, next) => {
  try {
    const { id } = req.params;

    const PData = req.body;
    const workshop = await Workshop.findById(id);

    workshop.participant.push(PData);

    workshop.save();

    const email = req.body.email;

    const name = PData.firstName + " " + PData.lastName;

    sendMail(email, id);
    sendMailToAdmin(name, PData.phone, PData.email);

    // const oneDayBeforeDate = new Date(workshop.date);
    // oneDayBeforeDate.setDate(oneDayBeforeDate.getDate() - 1);

    // schedule.scheduleJob(oneDayBeforeDate, function () {
    //   sendEmailAtTime(PData.email);
    //   console.log(
    //     "Email scheduled to be sent the day before the specified date."
    //   );
    // });
    res.json({ massage: "saved" });
  } catch (e) {
    next(e);
  }
});

// Sending a reminder
router.post("/reminder/:id", isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const subject = req.body.subject;
    const description = req.body.description;
    const workshop = await Workshop.findById(id);
    const participant = workshop.participant;

    for (let i of participant) {
      sendMailReminder({ i }, id, description, subject);
    }

    res.json({ massage: "send" });
  } catch (e) {
    next(e);
  }
});

// Cancellation of participation in the workshop
router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const workshop = await Workshop.findById(id);
    const participant = workshop.participant;
    // let index = participant.findIndex((item) => item.email === email);
    // if (index !== -1) {
    //   participant.splice(index, 1);
    // }
  } catch (e) {}
});

export { router as workshopsRouter };
