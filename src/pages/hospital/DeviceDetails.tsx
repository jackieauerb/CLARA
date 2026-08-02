import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/DeviceDetails.css";

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

type RequirementTone = "default" | "positive" | "warning" | "critical";

type Requirement = {
  label: string;
  value: string;
  note?: string;
  tone?: RequirementTone;
};

type MaintenanceStep = {
  number: string;
  title: string;
  description: string;
  detail?: string;
  warning?: string;
  critical?: boolean;
};

type DeviceProfile = {
  id: string;
  manufacturer: string;
  name: string;
  model: string;
  department: string;
  image: string;
  category: string;
  procedureTitle: string;
  procedureDescription: string;
  updated: string;
  verificationId: string;
  estimatedTime: string;
  requirements: Requirement[];
  steps: MaintenanceStep[];
  criticalDetails: string[];
  inspectionPrompt: string;
  workflowUpdate?: {
    oldProcedure: string;
    newProcedure: string;
    effectiveDate: string;
  };
};

const deviceProfiles: DeviceProfile[] = [
  {
    id: "asterscope-flex-300",
    manufacturer: "Aster Medical Devices",
    name: "AsterScope Flex 300",
    model: "ASF-300",
    department: "Sterile Processing",
    image: endoscopeImage,
    category: "Flexible endoscope",
    procedureTitle: "Cleaning and reprocessing",
    procedureDescription:
      "Follow these instructions immediately after use to protect the distal channel and prevent internal residue.",
    updated: "July 14, 2026",
    verificationId: "AM-ASF-CLN-2.4",
    estimatedTime: "12 minutes",
    requirements: [
      {
        label: "Water type",
        value: "Distilled water only",
        note: "Do not substitute tap water",
        tone: "critical",
      },
      {
        label: "Required adapter",
        value: "AsterFlow adapter",
        note: "Confirm a complete seal",
        tone: "warning",
      },
      {
        label: "Flush time",
        value: "90 seconds",
        note: "Continuous distal-channel flush",
        tone: "positive",
      },
      {
        label: "Maximum temperature",
        value: "40°C",
        note: "Do not exceed",
        tone: "critical",
      },
    ],
    steps: [
      {
        number: "01",
        title: "Begin immediately after use",
        description:
          "Power down the device and disconnect all detachable accessories before residue begins to dry.",
        detail:
          "Keep the insertion tube supported and avoid tight bends while moving the device.",
      },
      {
        number: "02",
        title: "Prepare the approved solution",
        description:
          "Combine distilled water with the approved enzymatic detergent at the concentration printed on the detergent label.",
        warning:
          "Do not use tap water. Mineral deposits can accumulate inside the distal channel.",
        critical: true,
      },
      {
        number: "03",
        title: "Attach the AsterFlow adapter",
        description:
          "Seat the adapter fully and confirm that the connection remains secure before starting the flush.",
        warning:
          "A partial connection can leave sections of the channel untreated.",
      },
      {
        number: "04",
        title: "Flush for 90 continuous seconds",
        description:
          "Maintain uninterrupted flow through the distal channel for the full 90-second interval.",
        warning:
          "Do not shorten this step. A 30-second flush does not fully clear the channel.",
        critical: true,
      },
      {
        number: "05",
        title: "Dry and inspect",
        description:
          "Dry the exterior with a lint-free cloth and inspect the distal end, channel opening, and insertion tube.",
        detail:
          "Report discoloration, unusual resistance, cracking, or evidence of deterioration.",
      },
    ],
    criticalDetails: [
      "Use distilled water only",
      "Attach the AsterFlow adapter",
      "Flush continuously for 90 seconds",
      "Keep all liquids below 40°C",
    ],
    inspectionPrompt:
      "Report channel resistance, discoloration, cracking, or visible deterioration.",
    workflowUpdate: {
      oldProcedure: "Filtered tap water",
      newProcedure: "Distilled water only",
      effectiveDate: "July 14, 2026",
    },
  },
  {
    id: "vectra-contrast-injector",
    manufacturer: "Vectra Medical",
    name: "Vectra Contrast Injector",
    model: "VCI-200",
    department: "Radiology",
    image: contrastInjectorImage,
    category: "Contrast injector",
    procedureTitle: "Daily setup and pressure-line care",
    procedureDescription:
      "Protect the injector head, pressure interface, and connector assembly before the next procedure.",
    updated: "July 11, 2026",
    verificationId: "VM-VCI-PM-4.1",
    estimatedTime: "8 minutes",
    requirements: [
      {
        label: "Approved cleaner",
        value: "70% isopropyl alcohol",
        note: "Apply to cloth, never directly",
        tone: "positive",
      },
      {
        label: "Connector torque",
        value: "Hand-tight only",
        note: "Do not use tools",
        tone: "critical",
      },
      {
        label: "Pressure test",
        value: "Before first daily use",
        note: "Complete with empty line",
        tone: "warning",
      },
      {
        label: "Fluid exposure",
        value: "Keep ports dry",
        note: "Never immerse injector head",
        tone: "critical",
      },
    ],
    steps: [
      {
        number: "01",
        title: "Disconnect disposable components",
        description:
          "Remove the syringe, tubing, and all single-use components according to hospital disposal procedures.",
      },
      {
        number: "02",
        title: "Wipe the injector head",
        description:
          "Apply 70% isopropyl alcohol to a lint-free cloth and wipe the exterior surfaces.",
        warning:
          "Do not spray cleaner directly into the injector head or connector openings.",
        critical: true,
      },
      {
        number: "03",
        title: "Inspect the pressure connector",
        description:
          "Check the connector threads and sealing surface for residue, deformation, or cracking.",
        detail:
          "Tighten replacement connections by hand only. Tools can damage the connector.",
      },
      {
        number: "04",
        title: "Run the daily pressure test",
        description:
          "Complete the automated pressure test before the first procedure of the day.",
        warning:
          "Remove the injector from service if pressure does not remain stable.",
        critical: true,
      },
      {
        number: "05",
        title: "Confirm unrestricted movement",
        description:
          "Move the injector arm through its normal range and confirm that cables remain clear.",
      },
    ],
    criticalDetails: [
      "Apply cleaner to a cloth, not the device",
      "Hand-tighten connectors only",
      "Run the pressure test every day",
      "Keep connector ports completely dry",
    ],
    inspectionPrompt:
      "Report pressure drift, connector cracking, fluid intrusion, or restricted arm movement.",
  },
  {
    id: "nova-infusion-pump",
    manufacturer: "Northstar Medical",
    name: "Nova Infusion Pump",
    model: "NP-410",
    department: "Clinical Engineering",
    image: infusionPumpImage,
    category: "Infusion pump",
    procedureTitle: "Preventive inspection and occlusion check",
    procedureDescription:
      "Inspect the pumping mechanism and pressure-sensing components before returning the pump to service.",
    updated: "July 9, 2026",
    verificationId: "NM-NP-INS-3.8",
    estimatedTime: "10 minutes",
    requirements: [
      {
        label: "Door inspection",
        value: "Before every use",
        note: "Confirm complete latch engagement",
        tone: "warning",
      },
      {
        label: "Cleaning method",
        value: "Damp cloth only",
        note: "Do not saturate",
        tone: "critical",
      },
      {
        label: "Occlusion test",
        value: "Every 30 days",
        note: "Use approved test fixture",
        tone: "positive",
      },
      {
        label: "Battery threshold",
        value: "80% minimum",
        note: "Before mobile use",
        tone: "warning",
      },
    ],
    steps: [
      {
        number: "01",
        title: "Inspect the pump door",
        description:
          "Open and close the pump door while checking the latch, hinge, and tubing channel.",
        warning:
          "Do not use the pump if the door does not close evenly or requires unusual force.",
        critical: true,
      },
      {
        number: "02",
        title: "Clean the tubing channel",
        description:
          "Use a lightly dampened lint-free cloth to remove residue from the tubing path.",
        warning:
          "Do not allow liquid to enter the pressure sensor or door mechanism.",
      },
      {
        number: "03",
        title: "Inspect the pressure sensor",
        description:
          "Confirm that the sensor surface is clean, centered, and free from visible damage.",
      },
      {
        number: "04",
        title: "Run the occlusion test",
        description:
          "Use the approved fixture and confirm that the alarm activates within the verified pressure range.",
        warning:
          "Remove the pump from service if the alarm activates outside the approved range.",
        critical: true,
      },
      {
        number: "05",
        title: "Verify battery condition",
        description:
          "Confirm charge level, inspect the power connector, and document any unexpected battery loss.",
      },
    ],
    criticalDetails: [
      "Keep liquid away from the pressure sensor",
      "Confirm the door latches evenly",
      "Use the approved occlusion-test fixture",
      "Remove from service after abnormal alarm behavior",
    ],
    inspectionPrompt:
      "Report inconsistent alarms, door resistance, cracked housings, or unexpected battery loss.",
  },
  {
    id: "aurelia-anesthesia-workstation",
    manufacturer: "Aurelia Medical",
    name: "Aurelia Anesthesia Workstation",
    model: "AAW-600",
    department: "Anesthesiology",
    image: anesthesiaWorkstationImage,
    category: "Anesthesia workstation",
    procedureTitle: "Pre-use system inspection",
    procedureDescription:
      "Verify gas delivery, breathing-circuit integrity, and absorber condition before clinical use.",
    updated: "July 7, 2026",
    verificationId: "AUM-AAW-PRE-5.2",
    estimatedTime: "14 minutes",
    requirements: [
      {
        label: "Leak test",
        value: "Before each case",
        note: "Complete automated test",
        tone: "critical",
      },
      {
        label: "Absorbent level",
        value: "Above minimum line",
        note: "Check color and condition",
        tone: "warning",
      },
      {
        label: "O₂ supply",
        value: "Verified",
        note: "Pipeline and backup cylinder",
        tone: "positive",
      },
      {
        label: "Cleaning",
        value: "Approved wipes only",
        note: "Protect control surfaces",
        tone: "critical",
      },
    ],
    steps: [
      {
        number: "01",
        title: "Verify gas supplies",
        description:
          "Confirm pipeline pressure and verify that the backup oxygen cylinder is installed and adequately filled.",
      },
      {
        number: "02",
        title: "Inspect the breathing circuit",
        description:
          "Check all tubing, connectors, reservoir components, and valves for damage or loose connections.",
        warning:
          "Replace any component showing cracking, stiffness, or an incomplete seal.",
      },
      {
        number: "03",
        title: "Inspect the absorber",
        description:
          "Confirm adequate absorbent volume and inspect for color change, channeling, or excess moisture.",
      },
      {
        number: "04",
        title: "Complete the automated leak test",
        description:
          "Follow the on-screen test and confirm that the system passes before connecting a patient.",
        warning:
          "Do not bypass a failed leak test.",
        critical: true,
      },
      {
        number: "05",
        title: "Clean high-touch surfaces",
        description:
          "Use approved wipes on controls and handles while preventing liquid from entering seams or ports.",
      },
    ],
    criticalDetails: [
      "Complete a leak test before every case",
      "Verify pipeline and backup oxygen",
      "Replace damaged breathing-circuit components",
      "Never bypass a failed system test",
    ],
    inspectionPrompt:
      "Report failed leak tests, unstable gas pressure, valve resistance, or damaged circuit components.",
  },
  {
    id: "helios-ultrasound",
    manufacturer: "Helios Imaging",
    name: "Helios Ultrasound",
    model: "HI-700",
    department: "Diagnostic Imaging",
    image: ultrasoundImage,
    category: "Ultrasound system",
    procedureTitle: "Probe and system care",
    procedureDescription:
      "Protect the transducer face, cable, connector, and cooling system through routine inspection.",
    updated: "July 5, 2026",
    verificationId: "HI-US-PM-6.0",
    estimatedTime: "7 minutes",
    requirements: [
      {
        label: "Probe cleaner",
        value: "Probe-compatible only",
        note: "Check compatibility list",
        tone: "critical",
      },
      {
        label: "Cable bend radius",
        value: "Minimum 10 cm",
        note: "Do not wrap tightly",
        tone: "warning",
      },
      {
        label: "Air vents",
        value: "Keep unobstructed",
        note: "Inspect weekly",
        tone: "positive",
      },
      {
        label: "Connector handling",
        value: "Grip housing only",
        note: "Never pull the cable",
        tone: "critical",
      },
    ],
    steps: [
      {
        number: "01",
        title: "Disconnect the transducer correctly",
        description:
          "Release the connector lock and remove the connector by its housing.",
        warning:
          "Never disconnect a transducer by pulling on the cable.",
      },
      {
        number: "02",
        title: "Clean the probe",
        description:
          "Use only a cleaner listed as compatible with the specific transducer.",
        warning:
          "Unapproved chemicals can cloud or crack the acoustic lens.",
        critical: true,
      },
      {
        number: "03",
        title: "Inspect the lens and cable",
        description:
          "Look for cuts, swelling, discoloration, separation, or exposed material.",
      },
      {
        number: "04",
        title: "Store without tight bends",
        description:
          "Place the probe in its holder and maintain at least a 10 cm cable bend radius.",
      },
      {
        number: "05",
        title: "Inspect cooling vents",
        description:
          "Remove visible dust and confirm that carts, blankets, or supplies do not block airflow.",
      },
    ],
    criticalDetails: [
      "Use only probe-compatible cleaner",
      "Never pull or sharply bend the cable",
      "Inspect the acoustic lens before use",
      "Keep cooling vents unobstructed",
    ],
    inspectionPrompt:
      "Report lens separation, cable damage, overheating, image artifacts, or connector looseness.",
  },
  {
    id: "starview-monitor",
    manufacturer: "Northstar Medical",
    name: "StarView Monitor 12",
    model: "SM-120",
    department: "Critical Care",
    image: patientMonitorImage,
    category: "Patient monitor",
    procedureTitle: "Monitor, cable, and battery care",
    procedureDescription:
      "Inspect cables, connectors, mounting hardware, and battery condition to preserve reliable monitoring.",
    updated: "July 3, 2026",
    verificationId: "NM-SM-PM-2.9",
    estimatedTime: "6 minutes",
    requirements: [
      {
        label: "Cable inspection",
        value: "Every shift",
        note: "Check strain reliefs",
        tone: "warning",
      },
      {
        label: "Screen cleaner",
        value: "Alcohol-free",
        note: "Apply to microfiber cloth",
        tone: "critical",
      },
      {
        label: "Battery test",
        value: "Monthly",
        note: "Document runtime",
        tone: "positive",
      },
      {
        label: "Mount security",
        value: "Verify before use",
        note: "No visible movement",
        tone: "critical",
      },
    ],
    steps: [
      {
        number: "01",
        title: "Inspect all patient cables",
        description:
          "Check cable jackets, connector pins, and strain-relief points for damage.",
      },
      {
        number: "02",
        title: "Clean the display correctly",
        description:
          "Apply an approved alcohol-free cleaner to a microfiber cloth and wipe the screen gently.",
        warning:
          "Do not spray the display or use abrasive wipes.",
      },
      {
        number: "03",
        title: "Inspect mounting hardware",
        description:
          "Confirm that the monitor remains secure and that the mount does not shift under light pressure.",
        warning:
          "Remove the monitor from the mount if any fastener is loose.",
        critical: true,
      },
      {
        number: "04",
        title: "Check alarm audio",
        description:
          "Run the alarm test and confirm that visual and audible indicators operate correctly.",
      },
      {
        number: "05",
        title: "Verify battery runtime",
        description:
          "Document runtime during the scheduled test and compare it with the previous result.",
      },
    ],
    criticalDetails: [
      "Inspect cable strain reliefs every shift",
      "Use alcohol-free display cleaner",
      "Confirm the mounting system is secure",
      "Test audible and visual alarms",
    ],
    inspectionPrompt:
      "Report cable damage, display discoloration, loose mounts, alarm failure, or declining battery runtime.",
  },
  {
    id: "renova-dialysis-system",
    manufacturer: "Renova Medical",
    name: "Renova Dialysis System",
    model: "RDS-500",
    department: "Nephrology",
    image: dialysisMachineImage,
    category: "Dialysis system",
    procedureTitle: "Fluid-path disinfection and inspection",
    procedureDescription:
      "Protect the internal fluid path by following the complete disinfection cycle and verifying water quality.",
    updated: "June 30, 2026",
    verificationId: "RM-RDS-DIS-7.3",
    estimatedTime: "38 minutes",
    requirements: [
      {
        label: "Water quality",
        value: "Verified before cycle",
        note: "Record conductivity",
        tone: "critical",
      },
      {
        label: "Disinfectant",
        value: "Renova-approved only",
        note: "Correct concentration required",
        tone: "critical",
      },
      {
        label: "Contact time",
        value: "20 minutes",
        note: "Do not interrupt cycle",
        tone: "warning",
      },
      {
        label: "Residual test",
        value: "Required after rinse",
        note: "Must pass before use",
        tone: "positive",
      },
    ],
    steps: [
      {
        number: "01",
        title: "Verify incoming water quality",
        description:
          "Check and document conductivity and confirm the water system is within the approved range.",
        warning:
          "Do not begin the cycle if water quality is outside the approved range.",
        critical: true,
      },
      {
        number: "02",
        title: "Prepare approved disinfectant",
        description:
          "Use the manufacturer-approved product at the specified concentration.",
      },
      {
        number: "03",
        title: "Run the complete disinfection cycle",
        description:
          "Start the automated cycle and maintain the required 20-minute contact time.",
        warning:
          "Interrupting the cycle requires the complete procedure to be restarted.",
      },
      {
        number: "04",
        title: "Complete the rinse cycle",
        description:
          "Allow the system to complete all programmed rinse phases.",
      },
      {
        number: "05",
        title: "Test for residual disinfectant",
        description:
          "Complete the approved residual test before releasing the machine for patient use.",
        warning:
          "Do not use the machine until the residual test passes.",
        critical: true,
      },
    ],
    criticalDetails: [
      "Verify water quality before disinfection",
      "Use only approved disinfectant",
      "Maintain the full 20-minute contact time",
      "Pass the residual test before use",
    ],
    inspectionPrompt:
      "Report failed residual tests, conductivity drift, incomplete cycles, leaks, or unusual fluid-path resistance.",
  },
  {
    id: "surgimax-table",
    manufacturer: "SurgiMax",
    name: "SurgiMax 7000 Table",
    model: "SMX-7000",
    department: "Surgery",
    image: surgicalTableImage,
    category: "Surgical table",
    procedureTitle: "Mechanical inspection and surface care",
    procedureDescription:
      "Inspect locking systems, movement, pads, and load-bearing components before the next procedure.",
    updated: "June 28, 2026",
    verificationId: "SM-SMX-INS-4.5",
    estimatedTime: "9 minutes",
    requirements: [
      {
        label: "Brake test",
        value: "Before every case",
        note: "Confirm all floor locks",
        tone: "critical",
      },
      {
        label: "Fastener torque",
        value: "Manufacturer values only",
        note: "Use calibrated tool",
        tone: "critical",
      },
      {
        label: "Approved cleaner",
        value: "Neutral pH",
        note: "Protect seams and controls",
        tone: "positive",
      },
      {
        label: "Movement test",
        value: "Full range",
        note: "Listen for unusual noise",
        tone: "warning",
      },
    ],
    steps: [
      {
        number: "01",
        title: "Inspect pads and surfaces",
        description:
          "Check pads, seams, rails, and exposed surfaces for tears, separation, or retained fluid.",
      },
      {
        number: "02",
        title: "Clean with neutral-pH solution",
        description:
          "Apply cleaner to a cloth and wipe the table without saturating seams or control housings.",
      },
      {
        number: "03",
        title: "Test the floor locks",
        description:
          "Engage the brake system and verify that the table remains stationary under controlled pressure.",
        warning:
          "Do not use the table if any floor lock slips.",
        critical: true,
      },
      {
        number: "04",
        title: "Move through the full range",
        description:
          "Test height, tilt, articulation, and accessory adjustments without a patient.",
      },
      {
        number: "05",
        title: "Inspect structural fasteners",
        description:
          "Check for movement or visible loosening and use only manufacturer torque values for correction.",
        warning:
          "Do not estimate torque or use an uncalibrated tool.",
      },
    ],
    criticalDetails: [
      "Test all floor locks before each case",
      "Use only specified fastener torque",
      "Keep fluid out of seams and controls",
      "Remove from service after unexpected movement",
    ],
    inspectionPrompt:
      "Report brake slippage, unusual movement, loose rails, damaged pads, or unexpected mechanical noise.",
  },
  {
    id: "pulsepoint-defibrillator",
    manufacturer: "PulsePoint Medical",
    name: "PulsePoint Defibrillator",
    model: "PPD-820",
    department: "Emergency Medicine",
    image: defibrillatorImage,
    category: "Defibrillator",
    procedureTitle: "Readiness and discharge verification",
    procedureDescription:
      "Verify battery, electrodes, accessories, and energy delivery so the device remains ready for immediate use.",
    updated: "June 25, 2026",
    verificationId: "PP-PPD-RDY-8.0",
    estimatedTime: "8 minutes",
    requirements: [
      {
        label: "Self-test",
        value: "Every shift",
        note: "Confirm passing indicator",
        tone: "critical",
      },
      {
        label: "Battery charge",
        value: "90% minimum",
        note: "Install charged spare",
        tone: "warning",
      },
      {
        label: "Energy test",
        value: "Per monthly schedule",
        note: "Use approved analyzer",
        tone: "positive",
      },
      {
        label: "Electrode date",
        value: "Check every shift",
        note: "Replace expired packs",
        tone: "critical",
      },
    ],
    steps: [
      {
        number: "01",
        title: "Confirm the self-test passed",
        description:
          "Verify the ready indicator and review the device status screen for unresolved warnings.",
        warning:
          "Do not place the device in service after a failed self-test.",
        critical: true,
      },
      {
        number: "02",
        title: "Inspect cables and electrodes",
        description:
          "Check cable insulation, connectors, electrode packaging, and expiration dates.",
      },
      {
        number: "03",
        title: "Verify battery readiness",
        description:
          "Confirm the installed battery is above 90% and that a charged spare is available.",
      },
      {
        number: "04",
        title: "Complete the scheduled energy test",
        description:
          "Use the approved analyzer to verify delivered energy across the required settings.",
        warning:
          "Remove the device from service when delivered energy is outside tolerance.",
        critical: true,
      },
      {
        number: "05",
        title: "Confirm accessories",
        description:
          "Verify the presence of paddles, electrodes, printer paper, and required cables.",
      },
    ],
    criticalDetails: [
      "Confirm a passing self-test every shift",
      "Keep battery charge above 90%",
      "Replace expired electrode packs",
      "Use the approved analyzer for energy testing",
    ],
    inspectionPrompt:
      "Report failed self-tests, energy outside tolerance, damaged cables, or abnormal battery depletion.",
  },
  {
    id: "arcus-electrosurgical-generator",
    manufacturer: "Arcus Surgical",
    name: "Arcus Electrosurgical Generator",
    model: "AEG-450",
    department: "Operating Room",
    image: electrosurgicalGeneratorImage,
    category: "Electrosurgical generator",
    procedureTitle: "Connector, alarm, and output inspection",
    procedureDescription:
      "Protect output performance by inspecting ports, cables, ventilation, and alarm behavior.",
    updated: "June 22, 2026",
    verificationId: "AS-AEG-PM-3.6",
    estimatedTime: "11 minutes",
    requirements: [
      {
        label: "Output test",
        value: "Every 6 months",
        note: "Use calibrated analyzer",
        tone: "critical",
      },
      {
        label: "Port inspection",
        value: "Before every use",
        note: "No bent contacts",
        tone: "warning",
      },
      {
        label: "Air clearance",
        value: "10 cm minimum",
        note: "Keep vents open",
        tone: "positive",
      },
      {
        label: "Cleaning",
        value: "Damp cloth only",
        note: "Never spray ports",
        tone: "critical",
      },
    ],
    steps: [
      {
        number: "01",
        title: "Inspect output ports",
        description:
          "Check each connector opening for bent contacts, residue, cracking, or looseness.",
      },
      {
        number: "02",
        title: "Inspect cables and accessories",
        description:
          "Examine active-electrode and return-electrode cables for insulation damage.",
      },
      {
        number: "03",
        title: "Clean the exterior",
        description:
          "Wipe surfaces with a lightly dampened cloth while keeping all connector openings dry.",
        warning:
          "Never spray cleaner directly onto the generator.",
      },
      {
        number: "04",
        title: "Verify alarms and controls",
        description:
          "Run the system test and confirm correct audio, display, and return-electrode monitoring behavior.",
      },
      {
        number: "05",
        title: "Complete scheduled output testing",
        description:
          "Use a calibrated analyzer and compare each measured output with manufacturer tolerances.",
        warning:
          "Remove the generator from service after any out-of-tolerance result.",
        critical: true,
      },
    ],
    criticalDetails: [
      "Keep all connector ports dry",
      "Inspect cable insulation before use",
      "Maintain 10 cm ventilation clearance",
      "Use a calibrated analyzer for output testing",
    ],
    inspectionPrompt:
      "Report damaged ports, inconsistent output, alarm failure, overheating, or cable insulation damage.",
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

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 12H6" />
      <path d="m10 7-5 5 5 5" />
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

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 12 4 4 8-9" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 2.8 20h18.4z" />
      <path d="M12 9v5" />
      <path d="M12 17.5v.1" />
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

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5h14v10H9l-4 4z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function WaterIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3s6 6.3 6 11a6 6 0 0 1-12 0c0-4.7 6-11 6-11z" />
    </svg>
  );
}

function TemperatureIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 14.5V5a3 3 0 0 1 6 0v9.5a5 5 0 1 1-6 0z" />
      <path d="M12 7v9" />
    </svg>
  );
}

function AdapterIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 7h8v10H8z" />
      <path d="M10 3h4v4" />
      <path d="M10 17v4h4v-4" />
    </svg>
  );
}

function InspectIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2.8 12s3.2-5 9.2-5 9.2 5 9.2 5-3.2 5-9.2 5-9.2-5-9.2-5z" />
      <circle cx="12" cy="12" r="2.4" />
    </svg>
  );
}

function PowerIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v9" />
      <path d="M7 6.5a8 8 0 1 0 10 0" />
    </svg>
  );
}

function SolutionIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4h10l-1 16H8z" />
      <path d="M9 8h6" />
      <path d="M10 12h4" />
    </svg>
  );
}

function getRequirementIcon(label: string) {
  const normalized = label.toLowerCase();
  if (normalized.includes("water") || normalized.includes("clean")) return <WaterIcon />;
  if (normalized.includes("temperature")) return <TemperatureIcon />;
  if (normalized.includes("adapter") || normalized.includes("connector") || normalized.includes("torque")) return <AdapterIcon />;
  if (normalized.includes("time") || normalized.includes("date")) return <ClockIcon />;
  return <CheckIcon />;
}

function getStepIcon(step: MaintenanceStep) {
  const normalized = `${step.title} ${step.description}`.toLowerCase();
  if (normalized.includes("power") || normalized.includes("disconnect")) return <PowerIcon />;
  if (normalized.includes("solution") || normalized.includes("clean") || normalized.includes("wipe")) return <SolutionIcon />;
  if (normalized.includes("adapter") || normalized.includes("connector")) return <AdapterIcon />;
  if (normalized.includes("flush") || normalized.includes("time") || normalized.includes("cycle")) return <ClockIcon />;
  return <InspectIcon />;
}

export default function DeviceDetails() {
  const navigate = useNavigate();
  const { deviceId } = useParams<{ deviceId: string }>();

  const [activePanel, setActivePanel] = useState<"manufacturer" | "damage" | null>(null);
  const [confirmation, setConfirmation] = useState("");
  const [isLeaving, setIsLeaving] = useState(false);
  const [updateAcknowledged, setUpdateAcknowledged] = useState(false);

  const device = useMemo(() => {
    return deviceProfiles.find((profile) => profile.id === deviceId) ?? deviceProfiles[0];
  }, [deviceId]);

  useEffect(() => {
    const key = `hospital-update-acknowledged-${device.id}`;
    setUpdateAcknowledged(sessionStorage.getItem(key) === "true");
  }, [device.id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [device.id]);

  useEffect(() => {
    if (!activePanel) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActivePanel(null);
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [activePanel]);

  const returnToLibrary = () => {
  setIsLeaving(true);

  window.setTimeout(() => {
    navigate("/hospital", {
      state: { returningFromDevice: true },
    });
  }, 220);
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

  const acknowledgeUpdate = () => {
    sessionStorage.setItem(
      `hospital-update-acknowledged-${device.id}`,
      "true",
    );
    setUpdateAcknowledged(true);
  };

  const handlePanelSubmit = (message: string) => {
    setConfirmation(message);
    setActivePanel(null);
  };


  return (
    <div className={`device-details-page ${isLeaving ? "is-leaving" : ""}`}>
      <header className="device-details-header">
        <div className="device-details-header__left">
          <button className="device-details-logo" type="button" onClick={returnToLibrary}>
            CLARA<span>+</span>
          </button>

          <nav className="device-details-nav" aria-label="Main navigation">
            <button className="device-details-nav__item is-active" type="button" onClick={returnToLibrary}>
              Devices
            </button>
            <button className="device-details-nav__item" type="button">Documents</button>
            <button className="device-details-nav__item" type="button">Help</button>
          </nav>
        </div>

        <div className="device-details-account">
          <div className="device-details-account__text">
            <strong>Emily Carter</strong>
            <span>North Valley Medical Center</span>
          </div>
          <div className="device-details-avatar" aria-hidden="true">EC</div>
          <button className="device-details-signout" type="button" onClick={handleLogout}>Sign out</button>
        </div>
      </header>

      <main className="device-details-main">
        <button className="device-details-back" type="button" onClick={returnToLibrary}>
          <BackIcon />
          Medical device library
        </button>

        <section className="device-summary">
          <div className="device-summary__device">
            <div className="device-summary__image">
              <img src={device.image} alt={device.name} />
            </div>
            <div className="device-summary__identity">
              <h1>{device.name}</h1>
              <p>{device.model}<span />{device.department}</p>
            </div>
          </div>

          <div className="device-summary__procedure">
            <p>Current procedure</p>
            <h2>{device.procedureTitle}</h2>
            <div>
              <span>{device.verificationId}</span><i />
              <span>{device.estimatedTime}</span><i />
              <span>Updated {device.updated}</span>
            </div>
          </div>
        </section>

        {device.workflowUpdate && !updateAcknowledged && (
          <section
            className="device-update-notice"
            aria-label="Updated maintenance guidance"
          >
            <div className="device-update-notice__heading">
              <div>
                <span>Procedure changed</span>
                <h2>Use the new cleaning method</h2>
              </div>

              <small>Effective {device.workflowUpdate.effectiveDate}</small>
            </div>

            <div className="device-update-comparison">
              <div className="device-update-comparison__item is-old">
                <span>Old procedure</span>
                <strong>{device.workflowUpdate.oldProcedure}</strong>
              </div>

              <ArrowIcon />

              <div className="device-update-comparison__item is-new">
                <span>New procedure</span>
                <strong>{device.workflowUpdate.newProcedure}</strong>
              </div>
            </div>

            <button type="button" onClick={acknowledgeUpdate}>
              Got it
              <CheckIcon />
            </button>
          </section>
        )}

        <section className="device-requirements">
          <div className="device-section-title device-section-title--requirements">
            <span>Before you begin</span>
            <h2>Pay attention to these details</h2>
          </div>

          <div className="device-requirements__grid">
            {device.requirements.map((requirement) => (
              <article
                key={requirement.label}
                className={`device-requirement ${
                  requirement.tone === "critical" ? "is-critical" : ""
                }`}
              >
                <span className="device-requirement__icon">
                  {getRequirementIcon(requirement.label)}
                </span>

                <div>
                  <p>{requirement.label}</p>
                  <strong>{requirement.value}</strong>
                  {requirement.note && <span>{requirement.note}</span>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="device-procedure" id="device-procedure">
          <div className="device-section-title">
            <span>Step by step</span>
            <h2>Complete in order</h2>
          </div>

          <div className="device-procedure__list">
            {device.steps.map((step) => (
              <article
                className="device-step"
                key={`${device.id}-${step.number}`}
              >
                <span className="device-step__number">
                  {Number(step.number)}
                </span>

                <span className="device-step__icon">
                  {getStepIcon(step)}
                </span>

                <div className="device-step__instructions">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>

                {(step.warning || step.detail) && (
                  <div
                    className={`device-step__note ${
                      step.warning ? "is-warning" : ""
                    }`}
                  >
                    {step.warning ? <AlertIcon /> : <CheckIcon />}
                    <p>{step.warning ?? step.detail}</p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="device-actions">
          <button className="device-action" type="button">
            <span className="device-action__icon"><DocumentIcon /></span>
            <span className="device-action__copy"><strong>View full documentation</strong><small>Open the complete guidelines and specifications</small></span>
            <ArrowIcon />
          </button>

          <button className="device-action" type="button" onClick={() => { setConfirmation(""); setActivePanel("manufacturer"); }}>
            <span className="device-action__icon"><MessageIcon /></span>
            <span className="device-action__copy"><strong>Ask the manufacturer</strong><small>Get clarification from {device.manufacturer}</small></span>
            <ArrowIcon />
          </button>

          <button className="device-action device-action--damage" type="button" onClick={() => { setConfirmation(""); setActivePanel("damage"); }}>
            <span className="device-action__icon"><AlertIcon /></span>
            <span className="device-action__copy"><strong>Report early damage</strong><small>Flag wear before it becomes a larger issue</small></span>
            <ArrowIcon />
          </button>
        </section>

        {confirmation && <div className="device-confirmation" role="status"><CheckIcon /><span>{confirmation}</span></div>}
      </main>

      {activePanel && (
        <div className="device-panel-overlay" onMouseDown={() => setActivePanel(null)}>
          <aside className="device-panel" role="dialog" aria-modal="true" aria-labelledby="device-panel-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="device-panel__header">
              <div>
                <p>{activePanel === "manufacturer" ? "Manufacturer support" : "Device observation"}</p>
                <h2 id="device-panel-title">{activePanel === "manufacturer" ? `Ask ${device.manufacturer}` : "Report early damage"}</h2>
                <span>{device.name}</span>
              </div>
              <button type="button" aria-label="Close panel" onClick={() => setActivePanel(null)}><CloseIcon /></button>
            </div>

            <div className="device-panel__device">
              <img src={device.image} alt="" />
              <div><strong>{device.name}</strong><span>{device.model}</span><p>{device.department}</p></div>
            </div>

            {activePanel === "manufacturer" ? (
              <ManufacturerForm manufacturer={device.manufacturer} onSubmit={() => handlePanelSubmit(`Your question was sent to ${device.manufacturer}.`)} />
            ) : (
              <DamageForm prompt={device.inspectionPrompt} onSubmit={() => handlePanelSubmit(`Your observation for ${device.name} was sent to ${device.manufacturer}.`)} />
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

function ManufacturerForm({ manufacturer, onSubmit }: { manufacturer: string; onSubmit: () => void }) {
  const [question, setQuestion] = useState("");
  return (
    <div className="device-panel__body">
      <div className="device-panel__notice"><MessageIcon /><div><strong>Device details are included automatically</strong><p>{manufacturer} will receive the device, model, hospital, and current procedure with your question.</p></div></div>
      <label className="device-panel__field"><span>Your question</span><textarea rows={8} value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="What maintenance detail needs clarification?" /></label>
      <button className="device-panel__submit" type="button" disabled={!question.trim()} onClick={onSubmit}>Send to manufacturer <ArrowIcon /></button>
    </div>
  );
}

function DamageForm({ prompt, onSubmit }: { prompt: string; onSubmit: () => void }) {
  const [category, setCategory] = useState("Visible wear or deterioration");
  const [description, setDescription] = useState("");
  return (
    <div className="device-panel__body">
      <div className="device-panel__notice device-panel__notice--warning"><AlertIcon /><div><strong>Report the first sign of damage</strong><p>{prompt}</p></div></div>
      <label className="device-panel__field"><span>What did you notice?</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option>Visible wear or deterioration</option><option>Unexpected resistance</option><option>Loose or damaged component</option><option>Unexpected alarm behavior</option><option>Fluid or moisture</option><option>Other observation</option></select></label>
      <label className="device-panel__field"><span>Describe what happened</span><textarea rows={7} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Include where you noticed it and whether the device is still in service." /></label>
      <button className="device-panel__submit device-panel__submit--warning" type="button" disabled={!description.trim()} onClick={onSubmit}>Send observation <ArrowIcon /></button>
    </div>
  );
}