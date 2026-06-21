import { Context } from "koa";
import { analyzeImage } from "../services/gemini";

export default {
  async analyze(ctx: Context) {
    const file = ctx.request.files?.image as any;

    console.log("FILE OBJECT:", file);

    if (!file) {
      return ctx.badRequest("No image uploaded");
    }

    const filePath = file.filepath;

    console.log("FILE PATH:", filePath);

    try {
      const result = await analyzeImage(filePath);
      return ctx.send({ success: true, result });
    } catch (error: any) {
      console.log("ERROR:", error);
      return ctx.internalServerError("analysis failed", {
        error: error.message,
      });
    }
  },
};