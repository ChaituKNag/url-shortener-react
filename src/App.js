import { useRef, useState } from "react";
import fetch from "unfetch";
import "./styles.css";

/**
 * This is a CodeMentor project - app is created by following the requirements mentioned here:
 * https://www.codementor.io/projects/web/link-shortener-website-brqjanf6zq
 */

const API_TOKEN = "f73d4f44175299d8dd548700b5d0a8822d18d16e";

export default function App() {
  const inputRef = useRef();
  const [shortenedUrl, setShortenedUrl] = useState("");

  const handleShorten = async () => {
    const longUrl = inputRef.current.value;
    console.log(longUrl);
    if (longUrl.trim() === "") {
      return;
    }

    setShortenedUrl("");

    const resp = await fetch(`https://api-ssl.bitly.com/v4/shorten`, {
      method: "POST",
      body: JSON.stringify({
        long_url: longUrl
      }),
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json"
      }
    });

    const data = await resp.json();

    setShortenedUrl(data.link);
    await copyToClipboard(data.link);

    console.log("data", data);
  };

  const copyToClipboard = async (text) => {
    if (navigator?.clipboard) {
      await navigator.clipboard.writeText(text || shortenedUrl);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl">URL Shortener</h1>
      <h2>Simply give a URL and we will shorten it for you</h2>

      <div className="my-5">
        <input
          className="block w-full border rounded mb-2 p-1 focus:border-blue-500 outline-none"
          name="long-url"
          ref={inputRef}
          placeholder="Enter the long url"
        />
        <button
          onClick={handleShorten}
          className="uppercase bg-blue-500 px-3 py-1 rounded text-white border-blue-500 outline-none focus:bg-blue-600 hover:bg-blue-600"
        >
          Shorten
        </button>
      </div>
      {shortenedUrl && (
        <div>
          <p className="text-green-800 mb-4">
            Success! Shortened and copied to your clipboard 👍
          </p>
          <h2 className="text-xl">here it is</h2>

          <p className="rounded bg-blue-200 p-1 inline-block ">
            {shortenedUrl}
            <button
              onClick={() => copyToClipboard()}
              className="bg-blue-500 uppercase rounded text-white ml-4 px-3 py-1 outline-none hover:bg-blue-600"
            >
              copy
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
