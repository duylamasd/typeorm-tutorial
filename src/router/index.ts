import { Express } from "express";
import { GroupRouter } from "./group";
import { UserRouter } from "./user";
import { UserGroupRouter } from "./user-group";
import { MessageRecipientRouter } from "./message-recipient";
import { MessageRouter } from "./message";
import { ReminderFrequencyRouter } from "./reminder-frequency";
import { CustomerRouter } from "./customer";

/**
 * Initiate application routers.
 * @param {Express} app The application.
 */
const initRoutes = async (app: Express) => {
  let userRouter = UserRouter["getInstance"]().router;
  let groupRouter = GroupRouter["getInstance"]().router;
  let userGroupRouter = UserGroupRouter["getInstance"]().router;
  let messageRecipientRouter = MessageRecipientRouter["getInstance"]().router;
  let messageRouter = MessageRouter["getInstance"]().router;
  let reminderFrequencyRouter = ReminderFrequencyRouter["getInstance"]().router;
  let customerRouter = CustomerRouter["getInstance"]().router;

  app.use("/users", userRouter);
  app.use("/groups", groupRouter);
  app.use("/user-groups", userGroupRouter);
  app.use("/mesasge-recipients", messageRecipientRouter);
  app.use("/message", messageRouter);
  app.use("/reminder-frequency", reminderFrequencyRouter);
  app.use("/customer", customerRouter);
};

export default initRoutes;
