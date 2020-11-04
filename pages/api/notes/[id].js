import dbConnect from "../../../utils/dbConnect";
import Note from "../../../models/Note";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const note = await Note.findById(id);

        if (!note) {
          return res
            .status(400)
            .json({ success: false, data: "No item found with that id" });
        }
        res.status(200).json({ success: true, data: note });
      } catch (err) {
        res.status(400).json({ success: false, data: "No data found" });
      }
      break;

    case "PUT":
      try {
        const note = await Note.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!note) {
          return res
            .status(400)
            .json({ success: false, data: "No item found with that id" });
        }

        res.status(200).json({ success: true, data: note });
      } catch (err) {
        res.status(400).json({ success: false, data: "No data found" });
      }
      break;
    case "DELETE":
      try {
        const deletedNote = await Note.deleteOne({ _id: id });
        if (!deletedNote) {
          return res
            .status(400)
            .json({ success: false, data: "No item found with that id" });
        }

        res
          .status(200)
          .json({ success: true, data: {}, message: "Item Deleted" });
      } catch (err) {
        res.status(400).json({ success: false, data: "No data found" });
      }
      break;

    default:
      res.status(400).json({ success: false, data: "No data found" });
      break;
  }
};
