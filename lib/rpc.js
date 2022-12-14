import { customAlphabet } from "nanoid";
import fetchC from "./fetchCUSTOM";

export function RPCify(method, params) {
  return {
    jsonrpc: "2.0",
    method,
    id: customAlphabet("123456789")(16),
    params,
  };
}

export async function RpcRequest(method, params, rpcUrl = null) {
  const body = RPCify(method, params);

  const res = await fetchC({
    url: rpcUrl || process.env.NEXT_PUBLIC_RPC_URL,
    method: "POST",
    body,
  });

  // console.log(res);

  if (!res.success) {
    return {
      success: false,
      error: {
        message: res.errorMessage,
        data: res.error,
      },
    };
  }

  return {
    success: res.data && res.data.result && res.data.result["ok"],
    data: res.data && res.data.result && res.data.result.data,
    error: res.data.error && {
      message: res.data.error.message,
      code: res.data.error.code,
      data: res.data.error.data,
    },
  };
}
