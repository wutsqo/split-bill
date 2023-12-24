export default function Page() {
  return (
    <div className="h-full w-full min-h-screen flex justify-center items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://source.unsplash.com/random/1920x1080"
        alt=""
        className="absolute w-full h-full"
      />
      <div className="mockup-browser w-full max-w-screen-xl min-h-[80vh] border bg-base-300 flex flex-col">
        <div className="mockup-browser-toolbar shrink-0">
          <div className="input">http://localhost</div>
        </div>
        <div className="flex justify-center bg-base-300 w-full h-full absolute top-12">
          <iframe
            className="w-full h-full absolute top-1"
            src="/app"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
