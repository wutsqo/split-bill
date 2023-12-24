export default function Page() {
  return (
    <div className="h-full w-full min-h-screen flex justify-center items-center">
      <div className="mockup-phone hidden lg:block">
        <div className="camera"></div>
        <div className="display">
          <div className="artboard artboard-demo phone-4 bg-white">
            <iframe
              className="w-full h-full pt-4"
              src="/app"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
