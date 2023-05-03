import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import MobileOnboarding from "./components/Onboarding/mobileOnboarding";
import "./App.css";
import DesktopOnboarding from "./components/Onboarding/desktopOnboarding";
export default function App() {
  return (
    <>
      <MobileOnboarding />
      <DesktopOnboarding />
    </>
  );
}
