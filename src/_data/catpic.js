import axios from "axios";

export default async function() {
  const res = await axios.get("https://api.thecatapi.com/v1/images/search");
  return res.data[0]; // res.data[0].url bevat de image URL
}