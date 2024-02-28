import { joiLoginSchema } from "../../joi/login.joi";
import { joiParticipantSchema } from "../../joi/participant.joi";
import { joiRecipeSchema } from "../../joi/recipe.joi";
import { joiUserSchema } from "../../joi/users.joi";
import { joiWorkshopSchema } from "../../joi/workshop.joi";
import { validateSchema } from "./validate-schema";

export const validateWorkshop = validateSchema(joiWorkshopSchema);
export const validateUserRegistration = validateSchema(joiUserSchema);
export const validateLogin = validateSchema(joiLoginSchema);
export const validateRecipe = validateSchema(joiRecipeSchema);
export const validateParticipant = validateSchema(joiParticipantSchema);
