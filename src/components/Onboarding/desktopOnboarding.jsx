import { Button } from "react-bootstrap";
export default function desktopOnboarding() {
  return (
    <>
      <div className="container">
        <nav className="d-flex justify-between">
          <img src="/assets/Logo_PNG.svg" alt="Logo" />
          <div>
            <Button>Sign Up</Button>
            <Button>Log In</Button>
          </div>
        </nav>
        <h1>desktopOnboarding</h1>
      </div>
    </>
  );
}
