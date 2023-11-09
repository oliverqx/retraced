import { checkAdminAccess } from "../../security/helpers";
import deleteSink from "../../models/vectorsink/delete";
import { getById } from "../../models/vectorsink/get";

export default async function (req) {
  await checkAdminAccess(req);
  const existsRes = await getById(req.params.sinkId);
  if (!existsRes) {
    return {
      status: 404,
      body: JSON.stringify({ error: "Sink not found" }),
    };
  }
  const res = await deleteSink(req.params.sinkId);

  return {
    status: 200,
    body: JSON.stringify({ deleted: res }),
  };
}