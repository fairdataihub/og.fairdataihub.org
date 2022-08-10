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
  .card {
    backdrop-filter: blur(11px) saturate(200%);
    -webkit-backdrop-filter: blur(11px) saturate(200%);
    background-color: rgba(255, 255, 255, 0.09);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.3);
  }
`;

export default withOGImage<"query", ImageQueryProps>({
  template: {
    html: ({ title, description, app }) => {
      let appText = "FAIR Data Innovations Hub";
      let backgroundImage = "https://og-image-seven-eta.vercel.app/";

      if (app === "soda-for-sparc") {
        appText = `SODA for SPARC Documentation`;
        backgroundImage += "sodaBackground.svg";
      } else if (app === "fairshare") {
        appText = `FAIRshare Documentation`;
        backgroundImage += "fairshareBackground.svg";
      } else if (app === "fairdataihub") {
        appText = ``;
        backgroundImage += "fairdataihubBackground.svg";
      }

      return `
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          <div class='main text-slate-700 ' style='background-image: url(${backgroundImage});'>
            <style>${style}</style>
            
            <div class='card px-3 py-2 flex flex-col justify-between h-full w-full'>
              <div class='mx-14 mt-10'>
                <h1 class='text-[48px] font-bold'>${title ? title : ""}</h1>
                <h2 class='text-[25px] font-medium'>${
                  description ? description : ""
                }</h2>
              </div>

              <div class='mx-14 mb-8 flex justify-between'>
                <div class='flex flex-col items-end justify-end'>
                  
                  <p class='text-2xl pt-2 font-semibold'>${appText}</p>
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
          </div>
        </body>
      </html>
      `;
    },
  },
  cacheControl: `public, max-age=604800, immutable`,
  dev: {
    inspectHtml: false,
  },
});
