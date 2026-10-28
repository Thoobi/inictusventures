import { defineField } from "sanity";

// Source item ID from Webflow. The migration script upserts by this value,
// so re-running the import updates documents instead of duplicating them.
export const webflowIdField = defineField({
  name: "webflowId",
  title: "Webflow item ID",
  type: "string",
  readOnly: true,
  hidden: ({ value }) => !value,
});
