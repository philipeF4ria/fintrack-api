import validator from "validator";

import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js";
import { badRequest, internalServerError, ok } from "./helper.js";

class GetUserByIdController {
  async execute(httpRequest) {
    try {
      const { userId } = httpRequest.params;

      const isIdValid = validator.isUUID(userId);

      if (!isIdValid) {
        return badRequest({
          message: "The provided id is not valid",
        });
      }

      const getUserByIdUseCase = new GetUserByIdUseCase();

      const user = await getUserByIdUseCase.execute(userId);

      return ok(user);
    } catch (error) {
      console.log(error);
      return internalServerError(error);
    }
  }
}

export { GetUserByIdController };
