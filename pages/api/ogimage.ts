import { withOGImage } from "megasanjay-next-api-og-image";

interface ImageQueryProps {
  title: string;
  description?: string;
  app?: string;
}

const style = `
  * {
    margin: 0;
    font-family: "Inter";
  }
  @font-face {
    font-family: "Inter";
    src: url("https://fairdataihub.org/fonts/Inter-Regular.otf");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "Inter";
    src: url("https://fairdataihub.org/fonts/Inter-SemiBold.otf");
    font-weight: bold;
    font-style: normal;
  }
  .main {
    width: 1200px;
    height: 630px;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-size: cover;
    color: white;
  }
  p {
    font-size: 24px;
    line-height: 32px;
  }
  .socials {
    display: flex;
    align-items: center;
  }
  .socials > svg {
    margin-right: 5px;
  }
`;

export default withOGImage<"query", ImageQueryProps>({
  template: {
    html: ({ title, description, app }) => {
      let topText = "FAIR Data Innovations Hub";
      let backgroundImage = "hexbackground.jpg";
      let appLogo = "";

      if (app === "soda-for-sparc") {
        topText = `SODA for SPARC Documentation`;
        backgroundImage = "hexbackground.jpg";
        appLogo = "sodaforsparclogo.svg";
      } else if (app === "fairshare") {
        topText = `FAIRshare Documentation`;
        appLogo = "sodaforsparclogo.svg";
        backgroundImage = "hexbackground.jpg";
      }

      return `
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          <div class='main' style='background-image: url(https://og-image-seven-eta.vercel.app/${backgroundImage});'>
            <style>${style}</style>
             
            <div class='mx-14 mt-5'>
              <h1 class='text-[48px] font-bold'>${title ? title : ""}</h1>
              <h2 class='text-[25px] font-semibold'>${
                description ? description : ""
              }</h2>
            </div>

            <div class='mx-14 mb-8 flex justify-between'>
              <div class='flex flex-col items-end justify-end'>
                <img src='https://og-image-seven-eta.vercel.app/${appLogo}' alt='app-logo' class='w-10 h-10' />
                <p class='text-2xl pt-2 font-medium'>${topText}</p>
              </div>
             
              <div class='flex flex-col items-end justify-center'>
                <div class='flex items-center'>
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class='mr-2'><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  <p className='text-xl text-white ml-4 font-medium'> | @fairdataihub</p>
                </div>
                <p class='text-2xl pt-2 font-bold'>
                  FAIR Data Innovations Hub
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
      `;
    },
  },
  cacheControl: `public, max-age=604800, immutable`,
  dev: {
    inspectHtml: true,
  },
});
