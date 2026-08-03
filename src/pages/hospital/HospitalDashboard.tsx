import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/HospitalDashboard.css";

import anesthesiaWorkstationImage from "../../assets/devices/anesthesia-workstation.png";
import contrastInjectorImage from "../../assets/devices/contrast-injector.png";
import defibrillatorImage from "../../assets/devices/defibrillator.png";
import dialysisMachineImage from "../../assets/devices/dialysis-machine.png";
import electrosurgicalGeneratorImage from "../../assets/devices/electrosurgical-generator.png";
import endoscopeImage from "../../assets/devices/endoscope.png";
import infusionPumpImage from "../../assets/devices/infusion-pump.png";
import patientMonitorImage from "../../assets/devices/patient-monitor.png";
import surgicalTableImage from "../../assets/devices/surgical-table.png";
import ultrasoundImage from "../../assets/devices/ultrasound.png";

type DashboardFilter = "all" | "updated";

type Device = {
  id: string;
  manufacturer: string;
  name: string;
  model: string;
  department: string;
  image: string;
  guidance: string;
  hasUpdate?: boolean;
};

const devices: Device[] = [
  { id: "es-340-flexible-endoscope", manufacturer: "Aster Medical Devices", name: "ES-340 Endoscope", model: "ES-340", department: "Sterile Processing", image: endoscopeImage, guidance: "Cleaning and reprocessing", hasUpdate: true },
  { id: "vectra-contrast-injector", manufacturer: "Vectra Medical", name: "Vectra Contrast Injector", model: "VCI-200", department: "Radiology", image: contrastInjectorImage, guidance: "Setup and pressure-line care" },
  { id: "nova-infusion-pump", manufacturer: "Northstar Medical", name: "Nova Infusion Pump", model: "NP-410", department: "Clinical Engineering", image: infusionPumpImage, guidance: "Inspection and occlusion check" },
  { id: "aurelia-anesthesia-workstation", manufacturer: "Aurelia Medical", name: "Aurelia Anesthesia Workstation", model: "AAW-600", department: "Anesthesiology", image: anesthesiaWorkstationImage, guidance: "Pre-use system inspection" },
  { id: "helios-ultrasound", manufacturer: "Helios Imaging", name: "Helios Ultrasound", model: "HI-700", department: "Diagnostic Imaging", image: ultrasoundImage, guidance: "Probe and system care" },
  { id: "starview-monitor", manufacturer: "Northstar Medical", name: "StarView Monitor 12", model: "SM-120", department: "Critical Care", image: patientMonitorImage, guidance: "Monitor, cable, and battery care" },
  { id: "renova-dialysis-system", manufacturer: "Renova Medical", name: "Renova Dialysis System", model: "RDS-500", department: "Nephrology", image: dialysisMachineImage, guidance: "Fluid-path disinfection" },
  { id: "surgimax-table", manufacturer: "SurgiMax", name: "SurgiMax 7000 Table", model: "SMX-7000", department: "Surgery", image: surgicalTableImage, guidance: "Mechanical inspection and care" },
  { id: "pulsepoint-defibrillator", manufacturer: "PulsePoint Medical", name: "PulsePoint Defibrillator", model: "PPD-820", department: "Emergency Medicine", image: defibrillatorImage, guidance: "Readiness and discharge check" },
  { id: "arcus-electrosurgical-generator", manufacturer: "Arcus Surgical", name: "Arcus Electrosurgical Generator", model: "AEG-450", department: "Operating Room", image: electrosurgicalGeneratorImage, guidance: "Connector, alarm, and output check" },
];

function SearchIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg>;
}

function ScanIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4H5a1 1 0 0 0-1 1v3" /><path d="M16 4h3a1 1 0 0 1 1 1v3" /><path d="M20 16v3a1 1 0 0 1-1 1h-3" /><path d="M8 20H5a1 1 0 0 1-1-1v-3" /><path d="M8 12h8" /></svg>;
}

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13" /><path d="m14 7 5 5-5 5" /></svg>;
}

function UpdateIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 12 4 4 8-9" /></svg>;
}

export default function HospitalDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const isReturningFromDevice =
    (location.state as { returningFromDevice?: boolean } | null)
      ?.returningFromDevice === true;

  const [showSplash, setShowSplash] = useState(() =>
    sessionStorage.getItem("hospital-dashboard-welcomed") !== "true",
  );
  const [isEntering, setIsEntering] = useState(isReturningFromDevice);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<DashboardFilter>("all");
  const [openingDeviceId, setOpeningDeviceId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    if (!isReturningFromDevice) return;

    const frame = window.requestAnimationFrame(() => {
      setIsEntering(false);
    });

    navigate(location.pathname, { replace: true, state: null });

    return () => window.cancelAnimationFrame(frame);
  }, [isReturningFromDevice, location.pathname, navigate]);

  useEffect(() => {
    if (!showSplash) return;

    const timer = window.setTimeout(() => {
      setShowSplash(false);
      sessionStorage.setItem("hospital-dashboard-welcomed", "true");
    }, 3700);

    return () => window.clearTimeout(timer);
  }, [showSplash]);

  const visibleDevices = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return devices.filter((device) => {
      const matchesFilter = activeFilter === "all" || device.hasUpdate;
      const searchable = [device.name, device.manufacturer, device.model, device.department]
        .join(" ")
        .toLowerCase();
      return matchesFilter && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [activeFilter, query]);

  const openDevice = (deviceId: string) => {
    if (openingDeviceId) return;
    setOpeningDeviceId(deviceId);

    window.setTimeout(() => {
      navigate(`/hospital/devices/${deviceId}`);
    }, 260);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("hospital-dashboard-welcomed");

    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith("hospital-update-acknowledged-")) {
        sessionStorage.removeItem(key);
      }
    });

    navigate("/");
  };

  return (
    <div
      className={[
        "hospital-dashboard",
        openingDeviceId ? "is-opening-device" : "",
        isEntering ? "is-entering" : "",
      ].filter(Boolean).join(" ")}
    >
      {showSplash && (
        <div className="hospital-splash" aria-live="polite">
          <div className="hospital-splash__glow" />
          <div className="hospital-splash__content">
            <div className="hospital-splash__logo">CLARA<span>+</span></div>
            <p className="hospital-splash__eyebrow">North Valley Medical Center</p>
            <h1>Welcome back, Emily.</h1>
            <p className="hospital-splash__message">Retrieving your devices</p>
            <div className="hospital-splash__loader" aria-hidden="true"><span /></div>
          </div>
        </div>
      )}

      <header className="hospital-header">
        <div className="hospital-header__left">
          <button className="hospital-logo" type="button" onClick={() => navigate("/hospital")} aria-label="CLARA+ hospital dashboard">CLARA<span>+</span></button>
          <nav className="hospital-nav" aria-label="Hospital navigation">
            <button className="hospital-nav__item is-active" type="button">Devices</button>
            <button className="hospital-nav__item" type="button">Documents</button>
            <button className="hospital-nav__item" type="button">Help</button>
          </nav>
        </div>

        <div className="hospital-account">
          <div className="hospital-account__text"><strong>Emily Carter</strong><span>North Valley Medical Center</span></div>
          <div className="hospital-avatar" aria-hidden="true">EC</div>
          <button className="hospital-signout" type="button" onClick={handleLogout}>Sign out</button>
        </div>
      </header>

      <main className="hospital-main">
        <section className="hospital-hero">
          <div className="hospital-hero__copy">
            <p className="hospital-eyebrow">Hospital dashboard</p>
            <h1>Good afternoon, Emily.</h1>
            <p className="hospital-hero__description">Select a device to view clear maintenance guidance.</p>
          </div>

          <div className="hospital-summary">
            <button className={`hospital-summary__metric ${activeFilter === "all" ? "is-active" : ""}`} type="button" onClick={() => setActiveFilter("all")} aria-pressed={activeFilter === "all"}>
              <span className="hospital-summary__dot" /><span><strong>{devices.length}</strong><small>Devices</small></span>
            </button>
            <button className={`hospital-summary__metric hospital-summary__metric--updated ${activeFilter === "updated" ? "is-active" : ""}`} type="button" onClick={() => setActiveFilter("updated")} aria-pressed={activeFilter === "updated"}>
              <span className="hospital-summary__dot" /><span><strong>1</strong><small>Updated procedure</small></span>
            </button>
            <button className="hospital-scan" type="button"><ScanIcon />Scan a device</button>
          </div>
        </section>

        <div className="hospital-search">
          <SearchIcon />
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search device, manufacturer, model, or department" aria-label="Search medical devices" />
        </div>

        <section className="hospital-library">
          <div className="hospital-library__heading">
            <div>
              <h2>{activeFilter === "updated" ? "Updated guidance" : "Medical device library"}</h2>
              <p>{activeFilter === "updated" ? "A procedure has changed since it was last viewed." : "Maintenance guidance for the devices you support."}</p>
            </div>
            <span>{visibleDevices.length} {visibleDevices.length === 1 ? "device" : "devices"}</span>
          </div>

          {visibleDevices.length > 0 ? (
            <div className="hospital-device-grid">
              {visibleDevices.map((device) => (
                <button
                  className={`hospital-device-card ${device.hasUpdate ? "has-update" : ""} ${openingDeviceId === device.id ? "is-opening" : ""}`}
                  type="button"
                  key={device.id}
                  onClick={() => openDevice(device.id)}
                  disabled={Boolean(openingDeviceId)}
                >
                  {device.hasUpdate && (
                    <div className="hospital-device-card__top"><span className="hospital-device-card__update"><UpdateIcon />Updated guidance</span></div>
                  )}
                  <div className="hospital-device-card__image"><img src={device.image} alt={device.name} /></div>
                  <div className="hospital-device-card__content">
                    <p>{device.manufacturer}</p>
                    <h3>{device.name}</h3>
                    <div className="hospital-device-card__metadata"><span>{device.model}</span><i /><span>{device.department}</span></div>
                    <div className="hospital-device-card__footer"><span className={device.hasUpdate ? "is-updated" : ""}>{device.hasUpdate ? "See what changed" : device.guidance}</span><ArrowIcon /></div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="hospital-empty-state"><h3>No devices found</h3><p>Try another name, model, manufacturer, or department.</p></div>
          )}
        </section>
      </main>
    </div>
  );
}