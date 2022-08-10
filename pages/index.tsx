import Head from "next/head";
import React from "react";

export default function Index() {
  const [imageSource, setImageSource] = React.useState(
    "https://i.imgur.com/eMFPXds.png"
  );

  // Handle the submit event on form submit.
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const data = {
      title: event.target.title.value,
      description: event.target.description.value,
      app: event.target.app.value,
    };

    console.log(data);

    // Send the form data to our API and get a response.
    const response = await fetch(
      "/api/ogimage/?" +
        new URLSearchParams({
          title: data.title,
          description: data.description,
          app: data.app,
        })
    );

    console.log(response);

    // display the image

    const image = await response.blob();
    const imageSrc = URL.createObjectURL(image);
    setImageSource(imageSrc);
  };

  return (
    <div className="flex flex-col h-screen justify-between">
      <Head>
        <title>Next.js forms</title>
        <meta name="description" content="Learn forms with Next.js" />
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
                defaultValue={"soda-for-sparc"}
              >
                <option value="soda-for-sparc">SODA for SPARC</option>
                <option value="fairshare">FAIRshare</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded transition-all mt-10"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="imageContainer px-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageSource} alt="preview" />
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
