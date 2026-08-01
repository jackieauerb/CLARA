import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/ManufacturerDashboard.css";

import infusionPumpImage from "../../assets/devices/infusion-pump.png";

type ManufacturerMetric = "recurring" | "assistance" | "updates";

type InquiryStatus =
  | "open"
  | "guidance-sent"
  | "details-requested"
  | "escalated";

type RecentActionStatus =
  | "Acknowledged"
  | "Issue resolved"
  | "In progress";

type RecentAction = {
  id: string;
  type: "update" | "response" | "software";
  title: string;
  description: string;
  device: string;
  sent: string;
  hospitals: string;
  status: RecentActionStatus;
};

const recentActions: RecentAction[] = [
  {
    id: "cleaning-procedure",
    type: "update",
    title: "Updated cleaning procedure",
    description:
      "Clarified distal-channel cleaning steps and approved solution types.",
    device: "AsterScope Flex 300",
    sent: "May 6, 2026",
    hospitals: "6 of 8 acknowledged",
    status: "Acknowledged",
  },
  {
    id: "hospital-inquiry",
    type: "response",
    title: "Responded to hospital inquiry",
    description:
      "Provided guidance on occlusion alarm sensitivity settings.",
    device: "Infusion Pump X500",
    sent: "May 4, 2026",
    hospitals: "Mercy Plains Hospital",
    status: "Issue resolved",
  },
  {
    id: "software-update",
    type: "software",
    title: "Published software update",
    description:
      "Released occlusion-alarm improvement software version 2.3.1.",
    device: "Patient Monitor V2",
    sent: "April 28, 2026",
    hospitals: "10 of 12 acknowledged",
    status: "In progress",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13" />
      <path d="m14 7 5 5-5 5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 12 4 4 8-9" />
    </svg>
  );
}

function AssistanceIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="7.5" r="3.5" />
      <path d="M5.5 20c.6-4 2.8-6 6.5-6s5.9 2 6.5 6" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v5h5" />
      <path d="M10 13h5" />
      <path d="M10 17h5" />
    </svg>
  );
}

function HospitalIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 21V8h6v13" />
      <path d="M11 21V3h8v18" />
      <path d="M3 21h18" />
      <path d="M14 7h2" />
      <path d="M15 6v2" />
      <path d="M8 12h1" />
      <path d="M8 16h1" />
      <path d="M14 12h2" />
      <path d="M14 16h2" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5h14v10H9l-4 4z" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M5 14v6h14v-6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export default function ManufacturerDashboard() {
  const navigate = useNavigate();

  const [showSplash, setShowSplash] = useState(() => {
    return (
      sessionStorage.getItem("manufacturer-dashboard-welcomed") !==
      "true"
    );
  });

  const [activeMetric, setActiveMetric] =
    useState<ManufacturerMetric>("assistance");

  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const [inquiryStatus, setInquiryStatus] =
    useState<InquiryStatus>("open");

  useEffect(() => {
    if (!showSplash) {
      return;
    }

    const timer = window.setTimeout(() => {
      setShowSplash(false);

      sessionStorage.setItem(
        "manufacturer-dashboard-welcomed",
        "true",
      );
    }, 3700);

    return () => window.clearTimeout(timer);
  }, [showSplash]);

  useEffect(() => {
    if (!isInquiryOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsInquiryOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isInquiryOpen]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");

    sessionStorage.removeItem(
      "manufacturer-dashboard-welcomed",
    );

    navigate("/");
  };

  const handleMetricClick = (metric: ManufacturerMetric) => {
    setActiveMetric(metric);

    const targetId =
      metric === "assistance"
        ? "manufacturer-assistance"
        : "manufacturer-actions";

    document.getElementById(targetId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const openInquiry = () => {
    setInquiryStatus("open");
    setIsInquiryOpen(true);
  };

  const closeInquiry = () => {
    setIsInquiryOpen(false);
  };

  return (
    <div className="manufacturer-dashboard">
      {showSplash && (
        <div className="manufacturer-splash" aria-live="polite">
          <div className="manufacturer-splash__glow" />

          <div className="manufacturer-splash__content">
            <div className="manufacturer-splash__logo">
              VERA<span>+</span>
            </div>

            <p className="manufacturer-splash__eyebrow">
              Aster Medical
            </p>

            <h1>Welcome back, Maya.</h1>

            <p className="manufacturer-splash__message">
              Retrieving hospital activity and field support
            </p>

            <div
              className="manufacturer-splash__loader"
              aria-hidden="true"
            >
              <span />
            </div>
          </div>
        </div>
      )}

      <header className="manufacturer-header">
        <div className="manufacturer-header__left">
          <button
            className="manufacturer-logo"
            type="button"
            onClick={() => navigate("/manufacturer-dashboard")}
            aria-label="VERA+ manufacturer dashboard"
          >
            VERA<span>+</span>
          </button>

          <nav
            className="manufacturer-nav"
            aria-label="Manufacturer navigation"
          >
            <button
              className="manufacturer-nav__item is-active"
              type="button"
            >
              Devices
            </button>

            <button
              className="manufacturer-nav__item"
              type="button"
            >
              Support
            </button>

            <button
              className="manufacturer-nav__item"
              type="button"
            >
              Insights
            </button>

            <button
              className="manufacturer-nav__item"
              type="button"
            >
              Documents
            </button>
          </nav>
        </div>

        <div className="manufacturer-account">
          <div className="manufacturer-account__text">
            <strong>Maya Chen</strong>
            <span>Regulatory Affairs · Aster Medical</span>
          </div>

          <div className="manufacturer-avatar" aria-hidden="true">
            MC
          </div>

          <button
            className="manufacturer-signout"
            type="button"
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="manufacturer-main">
        <section className="manufacturer-hero">
          <div className="manufacturer-hero__copy">
            <p className="manufacturer-eyebrow">
              Manufacturer dashboard
            </p>

            <h1>Good afternoon, Maya.</h1>

            <p className="manufacturer-hero__description">
              See how hospitals are maintaining your devices and
              respond when support is needed.
            </p>
          </div>

          <div className="manufacturer-overview">
            <button
              className={`manufacturer-metric manufacturer-metric--recurring ${
                activeMetric === "recurring"
                  ? "is-active"
                  : ""
              }`}
              type="button"
              onClick={() => handleMetricClick("recurring")}
              aria-pressed={activeMetric === "recurring"}
            >
              <span className="manufacturer-metric__icon manufacturer-metric__icon--recurring">
                <CheckIcon />
              </span>

              <span className="manufacturer-metric__content">
                <strong>0</strong>
                <span>Recurring issues</span>
                <small>No recurring issues right now</small>
              </span>
            </button>

            <button
              className={`manufacturer-metric manufacturer-metric--assistance ${
                activeMetric === "assistance"
                  ? "is-active"
                  : ""
              }`}
              type="button"
              onClick={() => handleMetricClick("assistance")}
              aria-pressed={activeMetric === "assistance"}
            >
              <span className="manufacturer-metric__icon manufacturer-metric__icon--assistance">
                <AssistanceIcon />
              </span>

              <span className="manufacturer-metric__content">
                <strong>1</strong>
                <span>Hospital could use assistance</span>
                <small>1 hospital has an open inquiry</small>
              </span>
            </button>

            <button
              className={`manufacturer-metric manufacturer-metric--updates ${
                activeMetric === "updates" ? "is-active" : ""
              }`}
              type="button"
              onClick={() => handleMetricClick("updates")}
              aria-pressed={activeMetric === "updates"}
            >
              <span className="manufacturer-metric__icon manufacturer-metric__icon--updates">
                <DocumentIcon />
              </span>

              <span className="manufacturer-metric__content">
                <strong>2</strong>
                <span>Updates in progress</span>
                <small>Being acknowledged by hospitals</small>
              </span>
            </button>
          </div>
        </section>

        <section
          className="manufacturer-assistance"
          id="manufacturer-assistance"
        >
          <div className="manufacturer-section-heading">
            <div>
              <h2>Needs your attention</h2>
              <p>One hospital could use your assistance.</p>
            </div>
          </div>

          <article className="manufacturer-inquiry-card">
            <div className="manufacturer-inquiry-card__image">
              <img
                src={infusionPumpImage}
                alt="Infusion Pump X500"
              />
            </div>

            <div className="manufacturer-inquiry-card__content">
              <span className="manufacturer-inquiry-badge">
                Inquiry open
              </span>

              <h3>
                Mercy Plains Hospital has a question about
                occlusion alarm behavior.
              </h3>

              <p className="manufacturer-inquiry-card__metadata">
                <span>Infusion Pump X500</span>
                <i />
                <span>Occlusion alarm behavior</span>
              </p>

              <p className="manufacturer-inquiry-card__description">
                A technician asked about alarm sensitivity during
                high-pressure conditions.
              </p>
            </div>

            <div className="manufacturer-inquiry-card__hospital">
              <HospitalIcon />

              <div>
                <strong>Mercy Plains Hospital</strong>
                <span>Opened 2 hours ago</span>
              </div>
            </div>

            <button
              className="manufacturer-inquiry-card__button"
              type="button"
              onClick={openInquiry}
            >
              View inquiry
              <ArrowIcon />
            </button>
          </article>
        </section>

        <section
          className="manufacturer-actions"
          id="manufacturer-actions"
        >
          <div className="manufacturer-section-heading manufacturer-section-heading--actions">
            <div>
              <h2>Recent actions in VERA+</h2>

              <p>
                Updates and responses your team has sent to
                hospitals.
              </p>
            </div>

            <button
              className="manufacturer-view-all"
              type="button"
            >
              View all actions
              <ArrowIcon />
            </button>
          </div>

          <div className="manufacturer-actions-table">
            <div className="manufacturer-actions-table__header">
              <span>Action</span>
              <span>Device</span>
              <span>Sent</span>
              <span>Hospitals</span>
              <span>Status</span>
              <span aria-hidden="true" />
            </div>

            {recentActions.map((action) => (
              <button
                className="manufacturer-action-row"
                type="button"
                key={action.id}
              >
                <span
                  className={`manufacturer-action-row__icon manufacturer-action-row__icon--${action.type}`}
                >
                  {action.type === "update" && <DocumentIcon />}
                  {action.type === "response" && <MessageIcon />}
                  {action.type === "software" && <UploadIcon />}
                </span>

                <span className="manufacturer-action-row__summary">
                  <strong>{action.title}</strong>
                  <small>{action.description}</small>
                </span>

                <span className="manufacturer-action-row__device">
                  {action.device}
                </span>

                <span className="manufacturer-action-row__sent">
                  {action.sent}
                </span>

                <span className="manufacturer-action-row__hospitals">
                  {action.hospitals}
                </span>

                <span
                  className={`manufacturer-action-status manufacturer-action-status--${action.status
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  {action.status}
                </span>

                <ArrowIcon />
              </button>
            ))}
          </div>
        </section>
      </main>

      {isInquiryOpen && (
        <div
          className="manufacturer-inquiry-overlay"
          role="presentation"
          onMouseDown={closeInquiry}
        >
          <aside
            className="manufacturer-inquiry-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="manufacturer-inquiry-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="manufacturer-inquiry-panel__header">
              <div>
                <span className="manufacturer-inquiry-badge">
                  Inquiry open
                </span>

                <h2 id="manufacturer-inquiry-title">
                  Occlusion alarm behavior
                </h2>

                <p>
                  Mercy Plains Hospital · Infusion Pump X500
                </p>
              </div>

              <button
                className="manufacturer-inquiry-panel__close"
                type="button"
                onClick={closeInquiry}
                aria-label="Close inquiry"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="manufacturer-inquiry-panel__device">
              <img
                src={infusionPumpImage}
                alt="Infusion Pump X500"
              />

              <div>
                <span>Device</span>
                <strong>Infusion Pump X500</strong>
                <p>Mercy Plains Hospital</p>
              </div>
            </div>

            <section className="manufacturer-inquiry-panel__section">
              <p className="manufacturer-inquiry-panel__label">
                Technician inquiry
              </p>

              <blockquote>
                We are seeing the occlusion alarm activate during
                high-pressure infusions even when the tubing appears
                clear. Should the pump be removed from service?
              </blockquote>

              <div className="manufacturer-inquiry-panel__context">
                <span>
                  Submitted by Jordan Lee, Clinical Engineering
                </span>

                <span>Opened 2 hours ago</span>
              </div>
            </section>

            <section className="manufacturer-inquiry-panel__section">
              <p className="manufacturer-inquiry-panel__label">
                Recommended response
              </p>

              <div className="manufacturer-suggested-response">
                <div className="manufacturer-suggested-response__icon">
                  <CheckIcon />
                </div>

                <div>
                  <strong>
                    Send verified troubleshooting guidance
                  </strong>

                  <p>
                    Ask the technician to inspect the tubing path and
                    pressure sensor connection, then run the
                    manufacturer occlusion test before returning the
                    pump to service.
                  </p>
                </div>
              </div>

              <button
                className="manufacturer-panel-primary-action"
                type="button"
                onClick={() =>
                  setInquiryStatus("guidance-sent")
                }
              >
                <span>
                  {inquiryStatus === "guidance-sent"
                    ? "Guidance sent"
                    : "Send verified guidance"}
                </span>

                {inquiryStatus === "guidance-sent" ? (
                  <CheckIcon />
                ) : (
                  <ArrowIcon />
                )}
              </button>
            </section>

            <section className="manufacturer-inquiry-panel__section">
              <p className="manufacturer-inquiry-panel__label">
                Other actions
              </p>

              <div className="manufacturer-panel-actions">
                <button
                  type="button"
                  onClick={() =>
                    setInquiryStatus("details-requested")
                  }
                >
                  <span>
                    <strong>Request device details</strong>

                    <small>
                      Ask for the serial number, alarm log, and tubing
                      setup.
                    </small>
                  </span>

                  <ArrowIcon />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setInquiryStatus("escalated")
                  }
                >
                  <span>
                    <strong>Escalate to field service</strong>

                    <small>
                      Create a service case and send the hospital’s
                      details.
                    </small>
                  </span>

                  <ArrowIcon />
                </button>
              </div>
            </section>

            {inquiryStatus !== "open" && (
              <div className="manufacturer-inquiry-panel__confirmation">
                <CheckIcon />

                <span>
                  {inquiryStatus === "guidance-sent" &&
                    "Verified guidance was sent to Mercy Plains Hospital."}

                  {inquiryStatus === "details-requested" &&
                    "Additional device details were requested from the hospital."}

                  {inquiryStatus === "escalated" &&
                    "The inquiry was escalated to field service."}
                </span>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}