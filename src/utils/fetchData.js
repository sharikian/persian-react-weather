import { json } from "react-router-dom";

const fetchData = async (api) => {
  const response = await fetch(api);

  if (!response.ok)
    throw json(
      { message: "شرمنده, داده های آب و هوایی دریافت نشد !" },
      { status: response.status }
    );

  const data = await response.json();

  return data;
};

export default fetchData;
