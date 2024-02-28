import mongoose from "mongoose";
import { workshopSchema } from "../schema/workshopSchema";

const Workshop = mongoose.model("workshop", workshopSchema);

export { Workshop };
