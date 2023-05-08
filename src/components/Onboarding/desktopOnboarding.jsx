import "./desktopOnboarding.css";
import AppLayout from "../Layout/AppLayout";
export default function desktopOnboarding() {
  return (
    <>
      <AppLayout className="container">
        <main className="">
          <h1 className="text-center mt-5">
            Electronic Dance Music: Festivals and Concerts
          </h1>
          <div>
            <div className="d-grid image-wrap">
              <div>
                <img
                  src="/assets/splashScreen/zachary-smith-zorgErvL_Fs-unsplash 1.png"
                  alt=""
                />
                <p className="text-center fw-bold image-text">
                  Find your next EDM experience. <br /> Spend less time
                  searching and more <br /> time enjoying.
                </p>
              </div>
              <div>
                <img src="/assets/splashScreen/image 10.png" alt="" />
                <p className="text-center fw-bold image-text">
                  Follow you favorite EDM artists to get <br /> updates on
                  events and tickets!
                </p>
              </div>
              <div>
                <img src="/assets/splashScreen/image 11.png" alt="" />
                <p className="text-center fw-bold image-text">
                  EDM music festival and concerts near you <br /> when you least
                  expect it.
                </p>
              </div>
            </div>
          </div>
        </main>
      </AppLayout>
    </>
  );
}
