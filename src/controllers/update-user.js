import validator from "validator";

import { badRequest, internalServerError, ok } from "./helper.js";
import { EmailAlreadyInUseError } from "../errors/user.js";

import { UpdateUserUseCase } from "../use-cases/update-user.js";

class UpdateUserController {
  async execute(httpRequest) {
    try {
      const { userId } = httpRequest.params;

      const isIdValid = validator.isUUID(userId);

      if (!isIdValid) {
        return badRequest({
          message: "The provided ID is not valid",
        });
      }

      const updateUserParams = httpRequest.body;

      const allowedFields = ["first_name", "last_name", "email", "password"];

      const someFieldIsNotAllowed = Object.keys(updateUserParams).some(
        (key) => !allowedFields.includes(key)
      );

      if (someFieldIsNotAllowed) {
        return badRequest({
          message: "Some provided field is not allowed",
        });
      }

      if (updateUserParams.password) {
        if (updateUserParams.password.length < 6) {
          return badRequest({
            message: "Password must be at least 6 characters",
          });
        }
      }

      if (updateUserParams.email) {
        const emailIsValid = validator.isEmail(updateUserParams.email);

        if (!emailIsValid) {
          return badRequest({
            message: "Invalid e-mail. Please provide a valid one.",
          });
        }
      }

      const updateUserUseCase = new UpdateUserUseCase();

      const updatedUser = await updateUserUseCase.execute(
        userId,
        updateUserParams
      );

      return ok(updatedUser);
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return badRequest({ message: error.message });
      }

      console.log(error);
      return internalServerError();
    }
  }
}

export { UpdateUserController };
