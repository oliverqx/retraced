import * as jwt from "jsonwebtoken";

import getConfig from "../../config/getConfig";

const config = getConfig();

export default function createViewersession(opts) {
  return new Promise((resolve, reject) => {
    // The token is the claims
    const session = {
      project_id: opts.token.project_id,
      project_name: "?",
      token: jwt.sign(opts.token, config.Session.HMACSecretViewer),
    };
    resolve(session);
  });
}