import NodeRSA from "node-rsa";
import { RpcRequest } from "./rpc";

function createKeys() {
  const key = new NodeRSA({ b: 512 });

  const publicKey = key.exportKey("pkcs1-public-pem");
  const privateKey = key.exportKey("pkcs1-private-pem");

  return {
    publicKey,
    privateKey,
  };
}

export async function createSession(examId, token) {
  const key = createKeys();

  const body = {
    req: {
      auth: {
        token,
      },
      body: {
        exam: examId,
        key: key.publicKey,
      },
    },
  };

  const res = await RpcRequest("exams.create_session", body);

  return {
    key,
    res,
  };
}
