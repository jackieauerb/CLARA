import { useNavigate } from 'react-router-dom'
import "../css/landing.css";

type AccessOptionProps = {
  label: string;
  onClick: () => void;
};

function AccessOption({ label, onClick }: AccessOptionProps) {
  return (
    <button className="access-option" onClick={onClick}>
      <span>{label}</span>
      <span className="access-option__arrow" aria-hidden="true">
        →
      </span>
    </button>
  );
}

export default function Landing() {
  const navigate = useNavigate()

  return (
    <main className="landing">
      <div className="landing__wash" aria-hidden="true" />

      <section className="landing__hero">
        <h1 className="wordmark">VERAFY<span className="text-[#4F7CFF]">+</span></h1>

        <p className="landing__statement">
          Protocol implementation, verified.
        </p>

        <div className="landing__access">
          <AccessOption label="Hospital" onClick={() => navigate('/login?type=hospital')} />
          <AccessOption label="Medical Device Company" onClick={() => navigate('/login?type=manufacturer')} />
        </div>
      </section>

      <footer className="landing__footer">
        <span>Devices.</span>
        <span>Updates.</span>
        <span>Clarity.</span>
      </footer>
    </main>
  );
}