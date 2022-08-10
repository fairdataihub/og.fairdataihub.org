import Head from "next/head";
import React from "react";

export default function Index() {
  const [imageSource, setImageSource] = React.useState(
    "https://og.fairdataihub.org/api/ogimage?title=FAIR%20Data%20Innovations%20Hub&description=Making%20FAIR%20data%20practices%20more%20accessible"
  );
  const [showSpinner, setShowSpinner] = React.useState(false);
  const [imageURL, setImageURL] = React.useState(
    "https://og.fairdataihub.org/api/ogimage?title=FAIR%20Data%20Innovations%20Hub&description=Making%20FAIR%20data%20practices%20more%20accessible"
  );

  const copyToClipboard = () => {
    navigator.clipboard.writeText(imageURL);
  };

  const handleSubmit = async (event) => {
    setShowSpinner(true);
    event.preventDefault();

    // Get data from the form.
    const data = {
      title: event.target.title.value,
      description: event.target.description.value,
      app: event.target.app.value,
    };

    // Send the form data to our API.
    const response = await fetch(
      "/api/ogimage/?" +
        new URLSearchParams({
          title: data.title,
          description: data.description,
          app: data.app,
        })
    );

    console.log(response);
    setImageURL(response.url);

    // display the image
    const image = await response.blob();
    const imageSrc = URL.createObjectURL(image);
    setImageSource(imageSrc);

    setShowSpinner(false);
  };

  return (
    <div className="flex flex-col h-screen justify-between">
      <Head>
        <title>Thumbnail generator</title>
        <meta
          name="description"
          content="Generate thumbnails for fairdataihub projects"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-row justify-between pt-16">
        <div className="form-container px-12">
          <h1 className="text-3xl font-bold my-3">Preview</h1>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-3 w-[400px]">
              <label htmlFor="title" className="mb-1">
                Title
              </label>
              <input type="text" id="title" name="title" required />
            </div>

            <div className="flex flex-col mb-3 w-[400px]">
              <label htmlFor="description" className="mb-1">
                Description
              </label>
              <textarea rows={2} id="description" name="description" />
            </div>

            <div className="flex flex-col mb-3 w-[400px]">
              <label htmlFor="app" className="mb-1">
                App
              </label>

              <select
                name="app"
                id="app"
                required
                defaultValue={"fairdataihub"}
              >
                <option value="fairdataihub">Default</option>
                <option value="soda-for-sparc">SODA for SPARC</option>
                <option value="fairshare">FAIRshare</option>
              </select>
            </div>

            <div className="flex flex-row space-x-8 items-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded transition-all mt-10"
              >
                Submit
              </button>
              {showSpinner && <span className="loader"></span>}
            </div>
          </form>
        </div>
        <div className="imageContainer px-12 flex flex-col">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageSource} alt="preview" />
          <div className="break-all my-2 bg-slate-100 py-1 px-1 rounded-md relative w-full">
            <p className="w-full text-sm font-medium">{imageURL}</p>

            {imageURL && (
              <div className="absolute right-0 bottom-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 hover:bg-slate-300 rounded-md active:translate-y-1 hover:cursor-pointer "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  onClick={copyToClipboard}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="flex justify-center py-4 text-base font-normal">
        <div className="mt-3 flex h-full flex-col items-center justify-center space-y-4 space-x-0 divide-x-2 divide-none divide-gray-200 py-5 md:flex-row md:space-y-0 md:space-x-4 md:divide-solid">
          <div className="text-center text-gray-500">
            <p>© 2022 FAIR Data Innovations Hub.</p>
            <p>All rights reserved.</p>
          </div>

          <div className="mt-0 flex flex-row items-center justify-center">
            <a
              href="https://vercel.com/?utm_source=fairdataihub&utm_campaign=oss"
              target="_blank"
              rel="noreferrer"
              className="mx-0 md:mx-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg"
                alt="Powered by Vercel"
                className="w-40"
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
