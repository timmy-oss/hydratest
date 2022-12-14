import fetchCUSTOM from "./fetchCUSTOM";

export default async function (file) {
  const body = {
    upload_file: file,
  };

  const res = await fetchCUSTOM({
    url: process.env.NEXT_PUBLIC_API_URL + "/upload",
    method: "POST",
    // auth: token,
    formEncoded: true,
    body,
  });

  return res;
}
