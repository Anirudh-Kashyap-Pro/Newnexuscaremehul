/**
 * NEXUSCARE AURA — HACKATHON HEALTHCARE OPERATING SYSTEM
 * Complete Interactive Application Engine
 * Enhanced with:
 * - Scroll Progress Glow Tracker & Reveal Engine
 * - Morphing Pop-Over Dynamic Island Widget
 * - Hospital Department Appointment Vacancy Matrix (Replaced Movie Tickets)
 * - Infinite Marquee Live Regional Vacancy Stream
 * - 3D Holographic Anatomy Engine with Double Laser Scanning
 */

// ==========================================================================
// 1. APPLICATION STATE STORE
// ==========================================================================
const appState = {
  currentRole: 'guest', // 'guest', 'patient', 'staff', 'admin'
  currentView: 'landing', // 'landing', 'patient-dash', 'symptom-assistant', 'cinema-booking' (now appointment-vacancies), 'hospital-search', 'pharmacy', 'staff-dash', 'admin-capacity', 'safety-reviews', 'wellness-articles', 'care-timeline', 'settings'
  
  // Patient Profile
  patient: {
    name: 'Ramesh Kumar',
    age: 54,
    gender: 'Male',
    bloodGroup: 'B+',
    abhaId: '91-4820-1928-4011',
    pmjayEligible: true,
    condition: 'Cardiac Evaluation & Clavicle Strain',
    currentWaitMinutes: 14,
    suggestedArrival: '10:45 AM (Slot at 11:00 AM)',
    vitals: {
      bp: '118/78',
      hr: 74,
      bloodSugar: 98,
      temperature: 36.6,
      spo2: 98
    }
  },

  // Staff Profile
  staff: {
    name: 'Dr. Priya Nair',
    role: 'Chief Cardiac Surgeon',
    hospitalId: 'METRO-CAR-8841',
    hospital: 'Metro Super-Specialty Hospital',
    department: 'Cardiology',
    shift: '08:00 - 16:00 (Shift A)',
    breakTime: '13:00 - 13:45'
  },

  // Admin Profile
  admin: {
    name: 'Apollo Metro Health System',
    facility: 'Metro General & Trauma Institute',
    license: 'NABH-DL-2024-9182',
    bedCapacity: 500,
    occupancyRate: 74
  },

  // 3D Anatomy State
  anatomyAngle: 'front', // 'front', 'back'
  anatomyZoom: 1.0,
  activeHotspot: 'cardiac',

  // Booking & Vacancy State
  selectedDoctor: 'Dr. Priya Nair',
  selectedDept: 'Cardiology',
  selectedSlot: null,
  activePasses: [
    {
      id: 'VAC-9821',
      doctor: 'Dr. Priya Nair',
      department: 'Cardiology',
      room: 'Chamber 204, OPD Block B',
      time: '11:00 AM Today',
      seat: 'B4',
      status: 'Confirmed'
    }
  ],

  // Morphing Pop-Over State
  popoverExpanded: false,

  // Medicine Store & Pre-Orders
  cart: [],
  preOrders: [],
  rxUploaded: false,
  rxPharmacistReview: 'Approved by R.Ph Ananya Sharma (Lic #DL-8821)',

  // Facility Safety Reports
  safetyIncidents: [
    {
      id: 'HAZ-8419',
      title: 'Water spill / slick surface near Radiology Corridor B',
      department: 'Facilities & Housekeeping',
      status: 'Cleaning Team Dispatched',
      time: '14 mins ago',
      reportedBy: 'Private (Patient Floor 2)'
    },
    {
      id: 'HAZ-8412',
      title: 'Wheelchair ramp handrail loose at Main OPD Gate',
      department: 'Maintenance & Civil',
      status: 'Resolved',
      time: '2 hours ago',
      reportedBy: 'Staff #312'
    },
    {
      id: 'HAZ-8408',
      title: 'Touchless sanitizer dispenser empty at Pediatric Waiting Area',
      department: 'Infection Control',
      status: 'Resolved',
      time: 'Yesterday',
      reportedBy: 'Private'
    }
  ],

  // AI Capacity Suggestions (Human-in-the-Loop)
  capacitySuggestions: [
    {
      id: 'CAP-01',
      title: 'Cardiology Afternoon Surge Defense',
      trend: '+28% footfall surge predicted between 14:00 - 16:00 based on outpatient weather patterns.',
      action: 'Open 4 overflow appointment vacancies in Chamber 205 and stagger Dr. Sandeep\'s break to 16:30.',
      status: 'Pending Approval'
    },
    {
      id: 'CAP-02',
      title: 'Orthopedics Underutilization Optimization',
      trend: 'Orthopedics capacity at 48% with 12 open afternoon consultation vacancies.',
      action: 'Enable elective physical therapy consultations to reduce Friday waiting backlog.',
      status: 'Pending Approval'
    }
  ],

  // Accessibility & Settings
  accessibility: {
    textSize: 'normal', // 'normal', 'lg', 'xl'
    highContrast: false,
    reducedMotion: false,
    lang: 'en'
  },

  // Audio Control
  audioMuted: false,

  // Ambulance Tracker
  ambulanceActive: false,
  ambulanceEtaSeconds: 420
};

// ==========================================================================
// 2. WEB AUDIO SYNTHESIZER
// ==========================================================================
class AuraAudioEngine {
  constructor() {
    this.ctx = null;
  }
  init() {
    if (appState.audioMuted) return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }
  tap() {
    if (appState.audioMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(640, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.035);
      gain.gain.setValueAtTime(0.045, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    } catch (e) {}
  }
  chime() {
    if (appState.audioMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = this.ctx.currentTime + idx * 0.12;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.06, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.4);
      });
    } catch (e) {}
  }
  alert() {
    if (appState.audioMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      [440, 880, 440, 880].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = this.ctx.currentTime + idx * 0.15;
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.3);
      });
    } catch (e) {}
  }
}
const audio = new AuraAudioEngine();

// ==========================================================================
// 3. MULTILINGUAL DICTIONARY
// ==========================================================================
const i18n = {
  en: {
    heroTitle: "Care Sooner. Zero Avoidable Delays.",
    heroSub: "Connecting patients, clinical teams, and hospital administrators with real-time capacity intelligence, compassionate triage, and clinical appointment vacancy clarity.",
    exploreDemo: "Explore Demo Mode",
    patientPortal: "Patient Portal",
    staffPortal: "Hospital Staff Portal",
    adminPortal: "Hospital Administrator",
    ambulanceDispatch: "Ambulance Dispatched",
    waitEstimate: "Current OPD Wait Time",
    vacancyMatrix: "Department Appointment Vacancy Matrix",
    preliminaryNotice: "Preliminary AI decision support — must be verified by a qualified clinician."
  },
  es: {
    heroTitle: "Atención más rápida. Cero demoras evitables.",
    heroSub: "Conectando pacientes, equipos clínicos y administración hospitalaria con inteligencia de capacidad en tiempo real y claridad de vacantes de citas.",
    exploreDemo: "Modo Demostración",
    patientPortal: "Portal del Paciente",
    staffPortal: "Portal del Personal Médico",
    adminPortal: "Administración Hospitalaria",
    ambulanceDispatch: "Ambulancia Despachada",
    waitEstimate: "Tiempo de Espera Actual",
    vacancyMatrix: "Matriz de Vacantes de Citas de Consulta",
    preliminaryNotice: "Soporte preliminar de IA: debe ser verificado por un médico cualificado."
  },
  hi: {
    heroTitle: "समय पर उचित उपचार। अस्पताल में बिना वजह इंतजार खत्म।",
    heroSub: "मरीजों, डॉक्टरों और अस्पताल प्रशासन को जोड़ने वाला सुरक्षित डिजिटल प्लेटफॉर्म। परामर्श रिक्ति स्पष्टता।",
    exploreDemo: "डेमो मोड आज़माएं",
    patientPortal: "मरीज पोर्टल",
    staffPortal: "अस्पताल स्टाफ पोर्टल",
    adminPortal: "अस्पताल प्रशासन",
    ambulanceDispatch: "एम्बुलेंस रवाना हो चुकी है",
    waitEstimate: "ओपीडी में अनुमानित प्रतीक्षा",
    vacancyMatrix: "विभाग अपॉइंटमेंट रिक्ति मैट्रिक्स",
    preliminaryNotice: "प्रारंभिक एआई मार्गदर्शन — योग्य डॉक्टर द्वारा समीक्षा आवश्यक है।"
  },
  fr: {
    heroTitle: "Des soins plus rapides. Zéro attente inutile.",
    heroSub: "Relier les patients, les soignants et la direction hospitalière avec une intelligence de capacité et de vacance de consultation en temps réel.",
    exploreDemo: "Mode Démonstration",
    patientPortal: "Portail Patient",
    staffPortal: "Portail Soignants",
    adminPortal: "Administration Hospitalière",
    ambulanceDispatch: "Ambulance Envoyée",
    waitEstimate: "Temps d'attente estimé",
    vacancyMatrix: "Matrice des Vacances de Rendez-vous",
    preliminaryNotice: "Aide préliminaire IA — doit être validée par un professionnel de santé."
  },
  zh: {
    heroTitle: "更快获得适切护理，消除无谓等待",
    heroSub: "以实时容量智能、同理心预检和清晰的就诊空位排布连接患者、临床医护与医院管理者。",
    exploreDemo: "探索演示模式",
    patientPortal: "患者门户",
    staffPortal: "医护团队门户",
    adminPortal: "医院管理系统",
    ambulanceDispatch: "救护车已派发",
    waitEstimate: "门诊当前预估候诊",
    vacancyMatrix: "科室门诊就诊空缺矩阵",
    preliminaryNotice: "初步AI辅助建议——必须由执业医师最终审核与确认。"
  }
};

// ==========================================================================
// 4. CORE APP INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  setupNavigationEvents();
  setupRoleSwitching();
  setupScrollEffects();
  setupMorphingPopover();
  setup3DAnatomyCenterpiece();
  setupAppointmentVacancyBooking();
  setupSymptomAssistant();
  setupEmergencyAmbulanceModal();
  setupTelehealthConsultModal();
  setupPharmacyAndPreorders();
  setupFacilitySafetyReporting();
  setupAdminAICapacityControls();
  setupSpotlightSearch();
  setupAccessibilityControls();

  // Render initial views
  render3DAnatomySvg();
  renderAppointmentVacancyMatrix();
  renderPharmacyProducts();
  renderSafetyIncidentsTable();
  renderStaffQueue();
  updateWaitTimeWidget();

  setTimeout(() => {
    showToast('✨ Dark Animated Theme & Appointment Vacancies Active!');
  }, 600);
});

// ==========================================================================
// 5. SCROLL EFFECTS & GLOWING PROGRESS BAR
// ==========================================================================
function setupScrollEffects() {
  const progressBar = document.getElementById('scroll-progress-bar');
  const header = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${scrolled}%`;
    }

    if (header) {
      if (scrollTop > 40) {
        header.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(52, 211, 153, 0.2)';
        header.style.borderColor = 'rgba(52, 211, 153, 0.4)';
      } else {
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
        header.style.borderColor = 'rgba(52, 211, 153, 0.2)';
      }
    }
  }, { passive: true });
}

// ==========================================================================
// 6. DYNAMIC MORPHING POP-OVER (Health Capsule Widget)
// ==========================================================================
function setupMorphingPopover() {
  const pillBtn = document.getElementById('morphing-capsule-pill');
  const container = document.getElementById('morphing-popover-container');

  if (pillBtn && container) {
    pillBtn.addEventListener('click', () => {
      audio.chime();
      appState.popoverExpanded = !appState.popoverExpanded;
      renderMorphingPopoverState();
    });
  }
}

function renderMorphingPopoverState() {
  const container = document.getElementById('morphing-popover-container');
  if (!container) return;

  if (appState.popoverExpanded) {
    container.innerHTML = `
      <div class="morphing-popover-expanded" role="dialog" aria-label="Quick Health Command Deck">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(52,211,153,0.25); padding-bottom:0.75rem;">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span class="pulse-beacon-dot"></span>
            <strong style="font-size:0.95rem; color:#FFFFFF;">Live Care Deck • Chamber 204</strong>
          </div>
          <button style="background:none; border:none; color:var(--text-muted); font-size:1.1rem; cursor:pointer;" onclick="toggleMorphingPopover(false)">✕</button>
        </div>

        <div style="background:rgba(8,20,14,0.85); border:1px solid var(--mint-border); border-radius:12px; padding:0.85rem; font-size:0.82rem;">
          <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
            <span style="color:var(--text-muted);">Attending Specialist:</span>
            <strong style="color:var(--mint-200);">${appState.selectedDoctor}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
            <span style="color:var(--text-muted);">Next Open Vacancy:</span>
            <strong style="color:#FFFFFF;">11:00 AM Today (Slot B4)</strong>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span style="color:var(--text-muted);">Current ER Queue Wait:</span>
            <strong style="color:var(--mint-300);">14 mins (Optimal Flow)</strong>
          </div>
        </div>

        <div style="display:flex; gap:0.5rem;">
          <button class="btn-primary-forest" style="flex:1; font-size:0.78rem; padding:0.55rem;" onclick="toggleMorphingPopover(false); navigateToView('cinema-booking');">
            🎟️ Reserve Vacancy
          </button>
          <button class="btn-outline-forest" style="font-size:0.78rem; padding:0.55rem;" onclick="toggleMorphingPopover(false); openTelehealthModal();">
            📞 Audio Call
          </button>
        </div>

        <button style="background:transparent; border:none; color:var(--text-muted); font-size:0.72rem; text-align:center; cursor:pointer;" onclick="toggleMorphingPopover(false)">
          Collapse Health Capsule ▾
        </button>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div id="morphing-capsule-pill" class="morphing-capsule-pill" onclick="toggleMorphingPopover(true)" title="Click to expand dynamic live health deck">
        <span class="pulse-beacon-dot"></span>
        <span>14 Open Vacancies • Chamber 204 Ready</span>
        <span style="font-size:0.75rem; background:rgba(52,211,153,0.2); padding:2px 6px; border-radius:99px; color:var(--mint-200);">⚡ Quick Deck</span>
      </div>
    `;
  }
}

window.toggleMorphingPopover = function(expand) {
  audio.tap();
  appState.popoverExpanded = expand;
  renderMorphingPopoverState();
};

// ==========================================================================
// 7. NAVIGATION & ROLE MANAGEMENT
// ==========================================================================
function setupNavigationEvents() {
  document.getElementById('brand-logo-btn')?.addEventListener('click', () => {
    audio.tap();
    if (appState.currentRole === 'guest') navigateToView('landing');
    else if (appState.currentRole === 'patient') navigateToView('patient-dash');
    else if (appState.currentRole === 'staff') navigateToView('staff-dash');
    else if (appState.currentRole === 'admin') navigateToView('admin-capacity');
  });

  document.querySelectorAll('[data-route]').forEach(btn => {
    btn.addEventListener('click', () => {
      audio.tap();
      const target = btn.getAttribute('data-route');
      if (target) navigateToView(target);
    });
  });
}

function navigateToView(viewId) {
  appState.currentView = viewId;

  document.querySelectorAll('.view-section').forEach(sec => sec.classList.add('hidden'));

  const target = document.getElementById(`view-${viewId}`);
  if (target) {
    target.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (viewId === 'cinema-booking') {
    renderAppointmentVacancyMatrix();
  } else if (viewId === 'patient-dash') {
    updateWaitTimeWidget();
  } else if (viewId === 'staff-dash') {
    renderStaffQueue();
  } else if (viewId === 'admin-capacity') {
    renderSafetyIncidentsTable();
  }

  showToast(`Navigated to: ${formatViewName(viewId)}`);
}

function formatViewName(id) {
  const map = {
    'landing': 'Welcome Overview',
    'patient-dash': 'Patient Care Dashboard',
    'symptom-assistant': 'Symptom Discussion Assistant',
    'cinema-booking': 'Department Appointment Vacancy Grid',
    'hospital-search': 'Nearby Urgent Care Facilities',
    'pharmacy': 'Pharmacy & Pre-Orders',
    'staff-dash': 'Clinical Staff Workstation',
    'admin-capacity': 'Hospital Capacity & AI Forecasting',
    'safety-reviews': 'Reviews & Incident Reporting',
    'wellness-articles': 'Community Articles & Challenges',
    'care-timeline': 'Unified Care Timeline',
    'settings': 'Accessibility & Privacy Controls'
  };
  return map[id] || id;
}

function setupRoleSwitching() {
  document.querySelectorAll('[data-role-switch]').forEach(btn => {
    btn.addEventListener('click', () => {
      audio.chime();
      const role = btn.getAttribute('data-role-switch');
      setAppRole(role);
    });
  });
}

function setAppRole(role) {
  appState.currentRole = role;

  document.querySelectorAll('.role-tab-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-role-switch') === role);
  });

  const userAvatar = document.getElementById('user-pill-avatar');
  const userName = document.getElementById('user-pill-name');
  const userRoleTag = document.getElementById('user-pill-role');

  if (role === 'guest') {
    if (userAvatar) userAvatar.textContent = 'G';
    if (userName) userName.textContent = 'Explore as Guest';
    if (userRoleTag) userRoleTag.textContent = 'Choose Path';
    navigateToView('landing');
  } else if (role === 'patient') {
    if (userAvatar) userAvatar.textContent = 'RK';
    if (userName) userName.textContent = 'Ramesh Kumar';
    if (userRoleTag) userRoleTag.textContent = 'Patient (ABHA Verified)';
    navigateToView('patient-dash');
    showToast('👤 Logged in as Patient: Ramesh Kumar');
  } else if (role === 'staff') {
    if (userAvatar) userAvatar.textContent = 'PN';
    if (userName) userName.textContent = 'Dr. Priya Nair';
    if (userRoleTag) userRoleTag.textContent = 'Chief of Cardiology (#8841)';
    navigateToView('staff-dash');
    showToast('🩺 Logged in as Staff: Dr. Priya Nair');
  } else if (role === 'admin') {
    if (userAvatar) userAvatar.textContent = 'MH';
    if (userName) userName.textContent = 'Metro Health System';
    if (userRoleTag) userRoleTag.textContent = 'Admin Authority';
    navigateToView('admin-capacity');
    showToast('🏛️ Logged in as Hospital Administrator');
  }
}

// ==========================================================================
// 8. 3D HOLOGRAPHIC ANATOMY ILLUSTRATION ENGINE
// ==========================================================================
function setup3DAnatomyCenterpiece() {
  document.getElementById('btn-anatomy-angle')?.addEventListener('click', () => {
    audio.tap();
    appState.anatomyAngle = appState.anatomyAngle === 'front' ? 'back' : 'front';
    const btn = document.getElementById('btn-anatomy-angle');
    if (btn) btn.textContent = appState.anatomyAngle === 'front' ? 'Anterior (Front)' : 'Posterior (Back)';
    updateAnatomySvgTransform();
    showToast(`Anatomy Perspective: ${appState.anatomyAngle.toUpperCase()} view`);
  });

  document.getElementById('btn-anatomy-zoom-in')?.addEventListener('click', () => {
    audio.tap();
    if (appState.anatomyZoom < 1.35) {
      appState.anatomyZoom += 0.15;
      updateAnatomySvgTransform();
    }
  });

  document.getElementById('btn-anatomy-zoom-out')?.addEventListener('click', () => {
    audio.tap();
    if (appState.anatomyZoom > 0.75) {
      appState.anatomyZoom -= 0.15;
      updateAnatomySvgTransform();
    }
  });

  document.querySelectorAll('.anatomy-hotspot-pin').forEach(pin => {
    pin.addEventListener('click', () => {
      audio.chime();
      const region = pin.getAttribute('data-region');
      inspectAnatomicalRegion(region);
    });
  });

  document.querySelectorAll('.organ-chip-card').forEach(card => {
    card.addEventListener('click', () => {
      audio.chime();
      const organ = card.getAttribute('data-organ');
      inspectOrganCard(organ);
    });
  });
}

function updateAnatomySvgTransform() {
  const svg = document.getElementById('svg-hologram-human');
  if (!svg) return;
  const rotateY = appState.anatomyAngle === 'back' ? '180deg' : '0deg';
  svg.style.transform = `scale(${appState.anatomyZoom}) rotateY(${rotateY})`;
  svg.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
}

function render3DAnatomySvg() {
  const container = document.getElementById('anatomy-svg-mount');
  if (!container) return;

  container.innerHTML = `
    <svg id="svg-hologram-human" width="100%" height="440" viewBox="0 0 280 480" style="filter: drop-shadow(0 15px 35px rgba(52, 211, 153, 0.35));">
      <defs>
        <linearGradient id="holoShineDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95"/>
          <stop offset="35%" stop-color="#A7F3D0" stop-opacity="0.85"/>
          <stop offset="70%" stop-color="#34D399" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#059669" stop-opacity="0.4"/>
        </linearGradient>

        <linearGradient id="spinalLaser" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#6EE7B7" stop-opacity="0.95"/>
          <stop offset="50%" stop-color="#34D399" stop-opacity="0.7"/>
          <stop offset="100%" stop-color="#059669" stop-opacity="0.2"/>
        </linearGradient>
      </defs>

      <line x1="140" y1="75" x2="140" y2="280" stroke="url(#spinalLaser)" stroke-width="3" stroke-dasharray="5 3"/>

      <!-- Head & Cranium -->
      <ellipse cx="140" cy="52" rx="27" ry="34" fill="url(#holoShineDark)" stroke="#34D399" stroke-width="1.8"/>
      <path d="M 124 50 Q 140 54 156 50" stroke="#10B981" stroke-width="2" fill="none" opacity="0.85"/>

      <!-- Cervical Spine -->
      <path d="M 131 82 L 131 98 L 149 98 L 149 82 Z" fill="url(#holoShineDark)" stroke="#34D399" stroke-width="1.2"/>

      <!-- Torso -->
      <path d="M 100 104 C 120 96, 160 96, 180 104 L 196 185 C 182 235, 155 275, 140 280 C 125 275, 98 235, 84 185 Z" 
            fill="url(#holoShineDark)" stroke="#34D399" stroke-width="2"/>

      <!-- Ribcage Lasers -->
      <path d="M 112 134 Q 140 146 168 134 M 115 156 Q 140 168 165 156 M 120 178 Q 140 188 160 178" 
            stroke="rgba(52, 211, 153, 0.75)" stroke-width="2" fill="none"/>

      <!-- Heart Node -->
      <circle cx="152" cy="148" r="8" fill="#EF4444" opacity="0.9">
        <animate attributeName="r" values="7;11;7" dur="0.81s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.95;0.45;0.95" dur="0.81s" repeatCount="indefinite"/>
      </circle>

      <!-- Limbs -->
      <path d="M 98 106 L 65 195 L 48 285 L 60 289 L 78 205 L 98 128 Z" fill="url(#holoShineDark)" stroke="#34D399" stroke-width="1.4"/>
      <path d="M 182 106 L 215 195 L 232 285 L 220 289 L 202 205 L 182 128 Z" fill="url(#holoShineDark)" stroke="#34D399" stroke-width="1.4"/>

      <!-- Pelvis -->
      <ellipse cx="140" cy="280" rx="36" ry="19" fill="url(#holoShineDark)" stroke="#34D399" stroke-width="1.6"/>

      <!-- Lower Limbs -->
      <path d="M 112 290 L 102 380 L 96 465 L 118 465 L 126 385 L 134 290 Z" fill="url(#holoShineDark)" stroke="#34D399" stroke-width="1.5"/>
      <path d="M 168 290 L 178 380 L 184 465 L 162 465 L 154 385 L 146 290 Z" fill="url(#holoShineDark)" stroke="#34D399" stroke-width="1.5"/>

      <!-- Knee Scanner Rings -->
      <ellipse cx="114" cy="382" rx="9" ry="5" fill="none" stroke="#34D399" stroke-width="2"/>
      <ellipse cx="166" cy="382" rx="9" ry="5" fill="none" stroke="#34D399" stroke-width="2"/>
    </svg>
  `;
}

function inspectAnatomicalRegion(region) {
  const modal = document.getElementById('generic-info-modal');
  const title = document.getElementById('generic-modal-title');
  const body = document.getElementById('generic-modal-body');
  if (!modal || !title || !body) return;

  const telemetryData = {
    cardiac: {
      title: '🫀 Cardiovascular Telemetry — Dr. Priya Nair Care Plan',
      content: `
        <div style="background:rgba(8,22,15,0.9); border:1px solid var(--mint-border); padding:1rem; border-radius:12px; margin-bottom:1rem;">
          <strong style="color:var(--mint-200);">Informational Visualization Disclaimer:</strong><br>
          <span style="font-size:0.82rem; color:var(--text-muted);">This model illustrates telemetry parameters gathered from recent clinical checkups. It does NOT constitute a clinical diagnosis.</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin-bottom:1rem;">
          <div class="metric-card-clean"><div class="metric-big-num" style="color:#EF4444;">74 BPM</div><div class="metric-label-txt">Resting Heart Rate (Normal Sinus Rhythm)</div></div>
          <div class="metric-card-clean"><div class="metric-big-num" style="color:var(--mint-300);">118/78</div><div class="metric-label-txt">Blood Pressure (Optimal)</div></div>
        </div>
        <p style="font-size:0.88rem; line-height:1.6; color:var(--text-main);">
          <strong>Recent Clinical Note:</strong> Dr. Priya Nair noted stable post-stress test recovery. Continue prescribed Atorvastatin 20mg daily. Next scheduled follow-up today at 11:00 AM (Chamber 204).
        </p>
        <div style="margin-top:1.25rem; display:flex; gap:0.5rem;">
          <button class="btn-primary-forest" onclick="closeGenericModal(); openTelehealthModal();">📞 Request Video Consult</button>
          <button class="btn-outline-forest" onclick="closeGenericModal(); navigateToView('cinema-booking');">🎟️ View Appointment Vacancies</button>
        </div>
      `
    },
    shoulder: {
      title: '🦴 Musculoskeletal Telemetry — Clavicle & Rotator Cuff',
      content: `
        <div style="background:rgba(8,22,15,0.9); border:1px solid var(--mint-border); padding:1rem; border-radius:12px; margin-bottom:1rem;">
          <strong style="color:var(--mint-200);">Orthopedic Care Guidance:</strong><br>
          <span style="font-size:0.82rem; color:var(--text-muted);">Right supraspinatus tendon inflammation reported 3 weeks ago. Range of motion improved to 88%.</span>
        </div>
        <p style="font-size:0.88rem; line-height:1.6; color:var(--text-main);">
          <strong>Recommended Exercises:</strong> Gentle pendulum stretches twice daily. Avoid overhead weight training until clearance by Dr. Sandeep Goel.
        </p>
      `
    },
    core: {
      title: '🌡️ Metabolic & Core Temperature Telemetry',
      content: `
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin-bottom:1rem;">
          <div class="metric-card-clean"><div class="metric-big-num" style="color:var(--mint-300);">36.6°C</div><div class="metric-label-txt">Core Body Temperature</div></div>
          <div class="metric-card-clean"><div class="metric-big-num" style="color:var(--mint-300);">98 mg/dL</div><div class="metric-label-txt">Fasting Blood Glucose (Normal)</div></div>
        </div>
        <p style="font-size:0.88rem; line-height:1.6; color:var(--text-main);">
          Hydration balance optimal. No acute metabolic warning flags detected in the last 72 hours.
        </p>
      `
    }
  };

  const selected = telemetryData[region] || telemetryData.cardiac;
  title.innerHTML = selected.title;
  body.innerHTML = selected.content;
  modal.classList.remove('hidden');
}

function inspectOrganCard(organ) {
  const organMap = {
    lungs: { title: '🫁 Lungs & Respiratory Function', text: 'Oxygen saturation (SpO2) at 98%. Respiratory rate: 16 breaths per min. Clear auscultation.' },
    brain: { title: '🧠 Cranial & Neurological Status', text: 'Cranial telemetry optimal. Sleep recovery index: 8.2/10. No acute migraine indicators.' },
    heart: { title: '🫀 Heart & Coronary Circulation', text: 'Cardiac output stable. Sinus rhythm monitored continuously. Ejection fraction: 62%.' }
  };
  const item = organMap[organ] || organMap.heart;
  alert(`${item.title}\n\n${item.text}\n\n[Informational Visualization Only]`);
}

// ==========================================================================
// 9. HOSPITAL DEPARTMENT APPOINTMENT VACANCY MATRIX (Replaces Movie Tickets)
// ==========================================================================
function setupAppointmentVacancyBooking() {
  document.getElementById('btn-confirm-seat-booking')?.addEventListener('click', () => {
    if (!appState.selectedSlot) {
      audio.alert();
      showToast('⚠️ Please tap an available appointment vacancy slot first!');
      return;
    }
    audio.chime();
    const tokenId = `VAC-${Math.floor(Math.random() * 8999 + 1000)}`;
    const newPass = {
      id: tokenId,
      doctor: appState.selectedDoctor,
      department: appState.selectedDept,
      room: 'Chamber 204, OPD Block B',
      time: '11:00 AM Today',
      seat: appState.selectedSlot,
      status: 'Confirmed'
    };
    appState.activePasses.unshift(newPass);

    showAppointmentVacancyConfirmationModal(newPass);
    appState.selectedSlot = null;
    renderAppointmentVacancyMatrix();
  });

  document.getElementById('booking-doc-select')?.addEventListener('change', (e) => {
    audio.tap();
    appState.selectedDoctor = e.target.value;
    const header = document.getElementById('cinema-screen-doctor-label');
    if (header) {
      header.textContent = `PHYSICIAN CONSULTATION TERMINAL: ${appState.selectedDoctor.toUpperCase()} • CHAMBER 204`;
    }
    appState.selectedSlot = null;
    renderAppointmentVacancyMatrix();
  });
}

function renderAppointmentVacancyMatrix() {
  const container = document.getElementById('cinema-seat-matrix');
  if (!container) return;

  const rows = [
    { label: 'A', name: 'Morning Vacancies (09:00 - 10:30)', count: 8 },
    { label: 'B', name: 'Morning Vacancies (10:30 - 12:00)', count: 10 },
    { label: 'C', name: 'Afternoon Vacancies (13:30 - 15:00)', count: 10 },
    { label: 'D', name: 'Evening Vacancies (16:00 - 17:30)', count: 8 }
  ];

  let html = '';
  rows.forEach(r => {
    html += `
      <div class="vacancy-row" role="group" aria-label="${r.name}">
        <span class="row-letter-tag">${r.label}</span>
    `;

    for (let i = 1; i <= r.count; i++) {
      const slotId = `${r.label}${i}`;
      const isOccupied = (i % 3 === 0 && r.label !== 'A') || (r.label === 'B' && i === 4);
      const isSelected = appState.selectedSlot === slotId;
      const statusClass = isSelected ? 'selected' : isOccupied ? 'occupied' : 'vacant';
      const ariaLabel = `Consultation Vacancy ${slotId}, ${isSelected ? 'Selected' : isOccupied ? 'Filled' : 'Available'}`;

      html += `
        <button type="button" 
                class="vacancy-slot ${statusClass}" 
                aria-label="${ariaLabel}"
                onclick="handleAppointmentSlotClick('${slotId}', ${isOccupied})">
          ${slotId}
        </button>
      `;
    }

    html += `</div>`;
  });

  container.innerHTML = html;

  const summary = document.getElementById('selected-seat-summary-txt');
  if (summary) {
    if (appState.selectedSlot) {
      summary.innerHTML = `<strong>Selected Vacancy: Slot ${appState.selectedSlot}</strong> (${appState.selectedDoctor} • 11:00 AM)`;
    } else {
      summary.textContent = '14 of 36 Consultation Vacancies Open Today • Select an available slot above';
    }
  }
}

window.handleAppointmentSlotClick = function(slotId, isOccupied) {
  if (isOccupied) {
    audio.tap();
    showToast(`Vacancy ${slotId} has been filled by another patient.`);
    return;
  }
  audio.tap();
  appState.selectedSlot = slotId;
  renderAppointmentVacancyMatrix();
  showToast(`Selected Vacancy: Slot ${slotId}`);
};

function showAppointmentVacancyConfirmationModal(pass) {
  const modal = document.getElementById('generic-info-modal');
  const title = document.getElementById('generic-modal-title');
  const body = document.getElementById('generic-modal-body');
  if (!modal || !title || !body) return;

  title.innerHTML = '🎟️ APPOINTMENT VACANCY PASS CONFIRMED!';
  body.innerHTML = `
    <div style="background:linear-gradient(135deg, rgba(14,36,26,0.98), rgba(6,16,11,0.98)); border:1.5px solid var(--mint-300); color:#FFFFFF; border-radius:18px; padding:1.5rem; margin-bottom:1.25rem; box-shadow:0 15px 35px rgba(0,0,0,0.6), 0 0 25px var(--mint-glow);">
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(52,211,153,0.3); padding-bottom:0.75rem; margin-bottom:1rem;">
        <div>
          <span style="font-size:0.7rem; color:var(--mint-300); text-transform:uppercase; font-weight:800; letter-spacing:0.05em;">Digital OPD Pass</span>
          <h3 style="font-size:1.4rem; font-weight:800; color:#FFFFFF;">Token #${pass.id}</h3>
        </div>
        <div style="background:rgba(52,211,153,0.2); border:1px solid var(--mint-300); padding:4px 12px; border-radius:99px; font-size:0.85rem; font-weight:800; color:var(--mint-200);">
          Slot ${pass.seat}
        </div>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; font-size:0.85rem;">
        <div><span style="color:var(--text-muted); font-size:0.72rem;">DOCTOR</span><br><strong>${pass.doctor}</strong></div>
        <div><span style="color:var(--text-muted); font-size:0.72rem;">DEPARTMENT</span><br><strong>${pass.department}</strong></div>
        <div><span style="color:var(--text-muted); font-size:0.72rem;">LOCATION</span><br><strong>${pass.room}</strong></div>
        <div><span style="color:var(--text-muted); font-size:0.72rem;">ESTIMATED WAIT</span><br><strong>14 mins • On Schedule</strong></div>
      </div>
      <div style="background:rgba(16,185,129,0.15); border:1px solid var(--mint-400); border-radius:10px; padding:0.65rem 0.85rem; margin-top:1rem; font-size:0.78rem; display:flex; justify-content:space-between; align-items:center;">
        <span>Fee: ₹0 under Ayushman PMJAY Cashless</span>
        <span style="color:var(--mint-300); font-weight:800;">VERIFIED</span>
      </div>
    </div>
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <span style="font-size:0.78rem; color:var(--text-muted);">Suggested Arrival: 10:45 AM (15m before slot)</span>
      <button class="btn-primary-forest" onclick="closeGenericModal(); navigateToView('patient-dash');">Done</button>
    </div>
  `;
  modal.classList.remove('hidden');
}

// ==========================================================================
// 10. SYMPTOM DISCUSSION ASSISTANT
// ==========================================================================
function setupSymptomAssistant() {
  const sendBtn = document.getElementById('btn-chat-send');
  const input = document.getElementById('chat-user-input');

  if (sendBtn && input) {
    sendBtn.addEventListener('click', () => processSymptomInput());
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') processSymptomInput();
    });
  }

  document.querySelectorAll('[data-symptom-preset]').forEach(card => {
    card.addEventListener('click', () => {
      const query = card.getAttribute('data-symptom-preset');
      const input = document.getElementById('chat-user-input');
      if (input) {
        input.value = query;
        processSymptomInput();
      }
    });
  });
}

function processSymptomInput() {
  const input = document.getElementById('chat-user-input');
  if (!input) return;
  const message = input.value.trim();
  if (!message) return;

  audio.tap();
  appendChatMessage(message, 'user');
  input.value = '';

  setTimeout(() => {
    evaluateSymptomResponse(message);
  }, 450);
}

function appendChatMessage(htmlContent, sender, isUrgent = false) {
  const scrollBox = document.getElementById('chat-messages-container');
  if (!scrollBox) return;

  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${sender} ${isUrgent ? 'urgent-alert' : ''}`;
  
  if (sender === 'assistant') {
    bubble.innerHTML = `
      <div class="chat-preliminary-tag">
        <span>🛡️ Preliminary AI Support</span> • <span>Supervised by Clinical Staff</span>
      </div>
      <div>${htmlContent}</div>
    `;
  } else {
    bubble.textContent = htmlContent;
  }

  scrollBox.appendChild(bubble);
  scrollBox.scrollTop = scrollBox.scrollHeight;
}

function evaluateSymptomResponse(query) {
  const q = query.toLowerCase();

  if (q.includes('chest') || q.includes('heart attack') || q.includes('breathing') || q.includes('crushing') || q.includes('stroke') || q.includes('collapsed')) {
    audio.alert();
    const urgentReply = `
      <div style="font-weight:800; font-size:1.05rem; color:#FCA5A5; margin-bottom:0.4rem; display:flex; align-items:center; gap:6px;">
        <span>🚨 RED ESCALATION: IMMEDIATE EMERGENCY CARE REQUIRED</span>
      </div>
      <p style="margin-bottom:0.65rem;">
        Your description of <strong>acute chest pressure / severe respiratory distress</strong> matches priority triage red-flags. Do NOT attempt to drive yourself to a clinic.
      </p>
      <div style="background:rgba(30,10,10,0.8); border:1.5px solid var(--urgent-red); border-radius:12px; padding:0.85rem; margin-bottom:0.75rem;">
        <strong style="font-size:0.85rem; color:#FFFFFF;">Nearest Trauma Facility with Cath Lab:</strong><br>
        <span style="font-size:0.82rem; color:var(--text-muted);">Metro Super-Specialty Hospital (2.4 km away • Cath Lab 01 Available • ER Wait: 8 mins)</span>
      </div>
      <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
        <button class="btn-ambulance-dispatch" onclick="openAmbulanceModal()">
          <span>🚑 Dispatch 108 Ambulance Now</span>
          <span>→</span>
        </button>
        <button class="btn-outline-forest" onclick="triggerEmergencyCall('108')">
          📞 Call 108
        </button>
      </div>
    `;
    appendChatMessage(urgentReply, 'assistant', true);
    return;
  }

  if (q.includes('cold') || q.includes('cough') || q.includes('throat') || q.includes('fever') || q.includes('acidity') || q.includes('headache')) {
    audio.chime();
    const nonUrgentReply = `
      <div style="font-weight:700; color:var(--mint-200); margin-bottom:0.4rem;">
        💡 Cautious At-Home Care & Monitoring (Avoid Unnecessary Waiting):
      </div>
      <p style="margin-bottom:0.6rem;">
        Based on your input, these appear to be mild symptoms that can be safely managed at home while observing for red flags:
      </p>
      <ul style="margin-left:1.25rem; margin-bottom:0.75rem; font-size:0.84rem; line-height:1.5;">
        <li>Stay well hydrated with warm water, lemon broth, or herbal infusions.</li>
        <li>Rest in a well-ventilated room; monitor temperature twice daily.</li>
        <li>If symptoms persist over 72 hours, an outpatient consultation vacancy can be booked.</li>
      </ul>
      <div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-top:0.5rem;">
        <button class="btn-primary-forest" style="font-size:0.78rem; padding:0.45rem 1rem;" onclick="openTelehealthModal()">
          📞 Request Telehealth Doctor Call
        </button>
        <button class="btn-outline-forest" style="font-size:0.78rem; padding:0.45rem 1rem;" onclick="navigateToView('cinema-booking')">
          🎟️ View Appointment Vacancies
        </button>
      </div>
    `;
    appendChatMessage(nonUrgentReply, 'assistant', false);
    return;
  }

  audio.chime();
  const defaultReply = `
    Thank you for sharing. To provide accurate care navigation:
    <br><br>
    1. How many hours or days have you noticed this?<br>
    2. On a scale of 1 to 10, how intense is the discomfort?<br>
    3. Are you experiencing any high fever or difficulty breathing?
    <br><br>
    <em>All guidance is reviewed by attending hospital clinicians before final clinical recommendations.</em>
  `;
  appendChatMessage(defaultReply, 'assistant', false);
}

// ==========================================================================
// 11. EMERGENCY 108 AMBULANCE DISPATCHER
// ==========================================================================
function setupEmergencyAmbulanceModal() {
  document.getElementById('btn-header-sos')?.addEventListener('click', () => {
    audio.alert();
    openAmbulanceModal();
  });
}

function openAmbulanceModal() {
  const modal = document.getElementById('ambulance-modal');
  if (!modal) return;
  modal.classList.remove('hidden');

  appState.ambulanceActive = true;
  appState.ambulanceEtaSeconds = 420;
  startAmbulanceCountdown();
  showToast('🚨 108 Ambulance Dispatch Initiated');
}

function startAmbulanceCountdown() {
  const timerElem = document.getElementById('ambulance-eta-timer');
  if (!timerElem) return;

  const interval = setInterval(() => {
    if (!appState.ambulanceActive || appState.ambulanceEtaSeconds <= 0) {
      clearInterval(interval);
      return;
    }
    appState.ambulanceEtaSeconds -= 1;
    const mins = Math.floor(appState.ambulanceEtaSeconds / 60);
    const secs = appState.ambulanceEtaSeconds % 60;
    timerElem.textContent = `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  }, 1000);
}

window.closeAmbulanceModal = function() {
  const modal = document.getElementById('ambulance-modal');
  if (modal) modal.classList.add('hidden');
};

window.triggerEmergencyCall = function(number) {
  audio.chime();
  alert(`📞 CALLING EMERGENCY SERVICES (${number})...\n\nConnected to Central Medical Dispatch.\nYour GPS Coordinates and ABHA Emergency Profile have been transmitted.`);
};

// ==========================================================================
// 12. TELEHEALTH DOCTOR CONSULT SIMULATION
// ==========================================================================
function setupTelehealthConsultModal() {
  document.querySelectorAll('[data-action="request-telehealth"]').forEach(btn => {
    btn.addEventListener('click', () => {
      audio.chime();
      openTelehealthModal();
    });
  });
}

function openTelehealthModal() {
  const modal = document.getElementById('telehealth-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  audio.chime();
  showToast('Connecting audio/video stream with Dr. Priya Nair...');
}

window.closeTelehealthModal = function() {
  const modal = document.getElementById('telehealth-modal');
  if (modal) modal.classList.add('hidden');
};

// ==========================================================================
// 13. PHARMACY & PRE-ORDERS
// ==========================================================================
const pharmacyProducts = [
  { id: 'med-01', name: 'Atorvastatin 20mg', brand: 'Lipitor • Pfizer', dosage: '1 Tablet Daily (Post-Dinner)', price: 185, inStock: true, requiresRx: true, category: 'Cardiovascular' },
  { id: 'med-02', name: 'Metformin 500mg SR', brand: 'Glycomet • USV', dosage: '1 Tablet Twice Daily with Meals', price: 94, inStock: true, requiresRx: true, category: 'Diabetes' },
  { id: 'med-03', name: 'Telmisartan 40mg', brand: 'Telma • Glenmark', dosage: '1 Tablet Morning', price: 142, inStock: false, preOrderDate: 'Available in 3 Days (Oct 23)', requiresRx: true, category: 'Cardiovascular' },
  { id: 'med-04', name: 'Vitamin D3 60k IU', brand: 'Calcirol • Cadila', dosage: '1 Capsule Weekly', price: 110, inStock: true, requiresRx: false, category: 'Daily Wellness' },
  { id: 'med-05', name: 'Montelukast + Levocetirizine', brand: 'Montair-LC • Cipla', dosage: '1 Tablet Night for Allergic Cough', price: 215, inStock: false, preOrderDate: 'Pre-Order: Dispatch Oct 22', requiresRx: true, category: 'Respiratory' },
  { id: 'med-06', name: 'Paracetamol 650mg', brand: 'Dolo • Micro Labs', dosage: 'As needed for fever/pain (Max 3/day)', price: 32, inStock: true, requiresRx: false, category: 'Pain Relief' }
];

function setupPharmacyAndPreorders() {
  document.getElementById('btn-upload-rx')?.addEventListener('click', () => {
    audio.tap();
    simulatePrescriptionUpload();
  });

  document.getElementById('btn-pharmacy-checkout')?.addEventListener('click', () => {
    if (appState.cart.length === 0 && appState.preOrders.length === 0) {
      audio.alert();
      showToast('Your pharmacy cart is empty.');
      return;
    }
    audio.chime();
    alert(`💊 MEDICINE ORDER CONFIRMED!\n\nDelivery to: Ramesh Kumar (Sector 14, Rohini)\nItems: ${appState.cart.length} In-Stock items\nPre-Orders: ${appState.preOrders.length} Allocated\nPharmacist Review: ${appState.rxPharmacistReview}\n\nLive courier dispatch updates enabled.`);
    appState.cart = [];
    appState.preOrders = [];
    updateCartBadge();
  });
}

function renderPharmacyProducts() {
  const grid = document.getElementById('pharmacy-products-grid');
  if (!grid) return;

  grid.innerHTML = pharmacyProducts.map(med => `
    <div class="medicine-card">
      <div>
        <div class="med-header-row">
          <span class="med-tag ${med.inStock ? 'in-stock' : 'pre-order'}">
            ${med.inStock ? '● In Stock' : '⏳ Pre-Order Eligible'}
          </span>
          <span style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">
            ${med.requiresRx ? '℞ Rx Required' : 'OTC Item'}
          </span>
        </div>
        <h4 class="med-name">${med.name}</h4>
        <div style="font-size:0.75rem; color:var(--mint-300); font-weight:700; margin-top:2px;">${med.brand}</div>
        <p class="med-dosage" style="margin-top:0.4rem;">${med.dosage}</p>
        ${!med.inStock ? `<div style="font-size:0.75rem; color:var(--amber-warn); font-weight:800; margin-top:4px;">${med.preOrderDate}</div>` : ''}
      </div>

      <div class="med-footer-row">
        <div>
          <span style="font-size:0.7rem; color:var(--text-muted);">Price</span>
          <div class="med-price">₹${med.price}</div>
        </div>
        ${med.inStock ? `
          <button class="btn-primary-forest" style="padding:0.45rem 1rem; font-size:0.78rem;" onclick="addToPharmacyCart('${med.id}')">
            + Add to Cart
          </button>
        ` : `
          <button class="btn-demo-quick" style="border-color:var(--amber-warn); color:var(--amber-warn); padding:0.45rem 0.95rem; font-size:0.78rem;" onclick="addToPreOrders('${med.id}')">
            📦 Pre-Order
          </button>
        `}
      </div>
    </div>
  `).join('');
}

window.addToPharmacyCart = function(medId) {
  audio.tap();
  const item = pharmacyProducts.find(m => m.id === medId);
  if (item) {
    appState.cart.push(item);
    updateCartBadge();
    showToast(`Added ${item.name} to pharmacy cart.`);
  }
};

window.addToPreOrders = function(medId) {
  audio.tap();
  const item = pharmacyProducts.find(m => m.id === medId);
  if (item) {
    appState.preOrders.push(item);
    updateCartBadge();
    showToast(`Pre-Order registered for ${item.name}. Notification active.`);
  }
};

function updateCartBadge() {
  const badge = document.getElementById('pharmacy-cart-count');
  if (badge) {
    const total = appState.cart.length + appState.preOrders.length;
    badge.textContent = total;
  }
}

function simulatePrescriptionUpload() {
  audio.chime();
  const statusElem = document.getElementById('rx-pharmacist-badge');
  if (statusElem) {
    statusElem.innerHTML = `
      <span style="color:var(--mint-300); font-weight:800;">● Verified: Rx-4921</span> 
      <span style="font-size:0.75rem; color:var(--text-muted);">(Reviewed by R.Ph Ananya Sharma)</span>
    `;
  }
  showToast('📄 Prescription uploaded and verified by Clinical Pharmacist.');
}

// ==========================================================================
// 14. FACILITY SAFETY INCIDENT REPORTING
// ==========================================================================
function setupFacilitySafetyReporting() {
  document.getElementById('btn-submit-safety-report')?.addEventListener('click', () => {
    const titleInput = document.getElementById('safety-incident-input');
    const deptSelect = document.getElementById('safety-dept-select');
    if (!titleInput || !titleInput.value.trim()) {
      audio.alert();
      showToast('Please describe the safety or cleanliness issue.');
      return;
    }
    audio.chime();
    const newReport = {
      id: `HAZ-${Math.floor(Math.random() * 899 + 100)}`,
      title: titleInput.value.trim(),
      department: deptSelect ? deptSelect.value : 'Facilities',
      status: 'Reported & Triaged',
      time: 'Just now',
      reportedBy: 'Private Citizen (Encrypted)'
    };
    appState.safetyIncidents.unshift(newReport);
    titleInput.value = '';
    renderSafetyIncidentsTable();
    showToast(`Report ${newReport.id} logged. Facilities team notified.`);
  });
}

function renderSafetyIncidentsTable() {
  const container = document.getElementById('safety-incidents-table-body');
  if (!container) return;

  container.innerHTML = appState.safetyIncidents.map(inc => `
    <div style="background:rgba(12,28,20,0.85); border:1px solid var(--mint-border); border-radius:12px; padding:1rem; margin-bottom:0.75rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem;">
      <div>
        <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:3px;">
          <span style="font-size:0.72rem; font-weight:800; background:rgba(52,211,153,0.15); color:var(--mint-200); padding:2px 6px; border-radius:4px;">${inc.id}</span>
          <span style="font-size:0.75rem; color:var(--text-muted);">${inc.department} • ${inc.time}</span>
        </div>
        <strong style="font-size:0.92rem; color:var(--text-bright);">${inc.title}</strong>
        <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">Reported by: ${inc.reportedBy}</div>
      </div>
      <div style="display:flex; align-items:center; gap:0.75rem;">
        <span style="font-size:0.78rem; font-weight:800; padding:4px 10px; border-radius:99px; background:${inc.status === 'Resolved' ? 'rgba(16,185,129,0.2)' : 'var(--amber-warn-bg)'}; color:${inc.status === 'Resolved' ? 'var(--mint-200)' : 'var(--amber-warn)'};">
          ● ${inc.status}
        </span>
        ${appState.currentRole === 'admin' ? `
          <button class="btn-outline-forest" style="padding:3px 10px; font-size:0.72rem;" onclick="cycleIncidentStatus('${inc.id}')">
            Update Status
          </button>
        ` : ''}
      </div>
    </div>
  `).join('');
}

window.cycleIncidentStatus = function(incId) {
  audio.tap();
  const inc = appState.safetyIncidents.find(i => i.id === incId);
  if (!inc) return;

  if (inc.status === 'Reported & Triaged') inc.status = 'Cleaning Team Dispatched';
  else if (inc.status === 'Cleaning Team Dispatched') inc.status = 'Resolved';
  else inc.status = 'Reported & Triaged';

  renderSafetyIncidentsTable();
  showToast(`Incident ${incId} updated to: ${inc.status}`);
};

// ==========================================================================
// 15. HOSPITAL ADMIN CAPACITY CONTROLS & STAFF QUEUE
// ==========================================================================
function setupAdminAICapacityControls() {
  document.getElementById('btn-approve-cap-01')?.addEventListener('click', () => {
    audio.chime();
    appState.capacitySuggestions[0].status = 'Approved & Applied';
    const card = document.getElementById('ai-suggestion-box-01');
    if (card) {
      card.style.background = 'rgba(16,185,129,0.2)';
      card.style.borderColor = '#10B981';
      card.innerHTML = `
        <div style="font-weight:800; color:var(--mint-200);">✅ Modification Approved by Hospital Administrator</div>
        <p style="font-size:0.85rem; color:var(--text-muted); margin-top:4px;">
          4 overflow consultation vacancies opened in Chamber 205. Doctor break schedule staggered to 16:30.
        </p>
      `;
    }
    showToast('AI capacity suggestion approved. Live vacancies expanded!');
  });
}

function renderStaffQueue() {
  const container = document.getElementById('staff-queue-mount');
  if (!container) return;

  const queuePatients = [
    { token: 'A-04', name: 'Ramesh Kumar', time: '11:00 AM', status: 'Arrived in Waiting Hall', condition: 'Cardiac Follow-up' },
    { token: 'A-07', name: 'Sunita Devi', time: '11:15 AM', status: 'Vitals Logged (BP 132/88)', condition: 'Hypertension Check' },
    { token: 'B-02', name: 'Marcus Vance', time: '11:30 AM', status: 'Pre-Registered', condition: 'Post-Op Stent Review' }
  ];

  container.innerHTML = queuePatients.map(p => `
    <div class="staff-queue-item">
      <div class="queue-patient-meta">
        <div class="queue-token-badge">${p.token}</div>
        <div>
          <strong style="font-size:0.95rem; color:var(--text-bright); display:block;">${p.name}</strong>
          <span style="font-size:0.78rem; color:var(--text-muted);">${p.condition} • ${p.time}</span>
        </div>
      </div>
      <div style="display:flex; align-items:center; gap:0.5rem;">
        <span style="font-size:0.75rem; background:rgba(16,185,129,0.2); color:var(--mint-200); padding:3px 8px; border-radius:99px; font-weight:800;">
          ${p.status}
        </span>
        <button class="btn-primary-forest" style="padding:0.4rem 0.85rem; font-size:0.75rem;" onclick="callNextPatient('${p.name}', '${p.token}')">
          📢 Call Next
        </button>
      </div>
    </div>
  `).join('');
}

window.callNextPatient = function(name, token) {
  audio.chime();
  alert(`📢 PATIENT CHIME BROADCAST\n\nCalling Token #${token} (${name}) to Chamber 204 (Dr. Priya Nair).\nNotification ping sent to patient's mobile pass!`);
};

function updateWaitTimeWidget() {
  const waitVal = document.getElementById('patient-live-wait-val');
  if (waitVal) {
    waitVal.textContent = `${appState.patient.currentWaitMinutes} mins`;
  }
}

// ==========================================================================
// 16. SPOTLIGHT SEARCH (⌘K)
// ==========================================================================
function setupSpotlightSearch() {
  const trigger = document.getElementById('btn-spotlight-trigger');
  const modal = document.getElementById('spotlight-modal');
  const input = document.getElementById('spotlight-search-input');

  trigger?.addEventListener('click', () => openSpotlight());

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openSpotlight();
    }
    if (e.key === 'Escape') {
      closeSpotlight();
      closeGenericModal();
      closeAmbulanceModal();
      closeTelehealthModal();
    }
  });

  input?.addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase().trim();
    filterSpotlightResults(val);
  });
}

function openSpotlight() {
  audio.tap();
  const modal = document.getElementById('spotlight-modal');
  const input = document.getElementById('spotlight-search-input');
  if (modal) modal.classList.remove('hidden');
  if (input) {
    input.value = '';
    setTimeout(() => input.focus(), 100);
  }
}

window.closeSpotlight = function() {
  const modal = document.getElementById('spotlight-modal');
  if (modal) modal.classList.add('hidden');
};

function filterSpotlightResults(val) {
  const container = document.getElementById('spotlight-results-list');
  if (!container) return;

  const catalog = [
    { title: 'Dr. Priya Nair', cat: 'Cardiology Specialist', view: 'cinema-booking' },
    { title: 'Dr. Sandeep Goel', cat: 'Orthopedic Specialist', view: 'cinema-booking' },
    { title: 'Appointment Vacancies Matrix', cat: 'Consultation Capacity', view: 'cinema-booking' },
    { title: '3D Anatomy Hologram Centerpiece', cat: 'Patient Dashboard', view: 'patient-dash' },
    { title: 'Symptom Discussion Assistant', cat: 'AI Triage Desk', view: 'symptom-assistant' },
    { title: '108 Ambulance Dispatcher', cat: 'Emergency Service', action: 'ambulance' },
    { title: 'Pharmacy & Pre-Orders', cat: 'Medications', view: 'pharmacy' },
    { title: 'Facility Safety Hazard Report', cat: 'Incident Manager', view: 'safety-reviews' },
    { title: 'Hospital Admin Capacity Portal', cat: 'Administrator', view: 'admin-capacity' }
  ];

  const filtered = val ? catalog.filter(i => i.title.toLowerCase().includes(val) || i.cat.toLowerCase().includes(val)) : catalog;

  container.innerHTML = filtered.map(item => `
    <div style="padding:0.75rem 1rem; border-radius:10px; background:rgba(12,28,20,0.8); border:1px solid var(--mint-border); display:flex; justify-content:space-between; align-items:center; cursor:pointer;"
         onclick="handleSpotlightItemClick('${item.view || ''}', '${item.action || ''}')">
      <div>
        <strong style="font-size:0.9rem; color:#FFFFFF;">${item.title}</strong>
        <span style="font-size:0.75rem; color:var(--text-muted); display:block;">${item.cat}</span>
      </div>
      <span style="font-size:0.8rem; color:var(--mint-300); font-weight:800;">Jump →</span>
    </div>
  `).join('');
}

window.handleSpotlightItemClick = function(view, action) {
  closeSpotlight();
  if (action === 'ambulance') {
    openAmbulanceModal();
  } else if (view) {
    navigateToView(view);
  }
};

// ==========================================================================
// 17. ACCESSIBILITY CONTROLS
// ==========================================================================
function setupAccessibilityControls() {
  document.querySelectorAll('[data-a11y-font]').forEach(btn => {
    btn.addEventListener('click', () => {
      audio.tap();
      const size = btn.getAttribute('data-a11y-font');
      document.body.classList.remove('text-lg', 'text-xl');
      if (size === 'lg') document.body.classList.add('text-lg');
      if (size === 'xl') document.body.classList.add('text-xl');
      document.querySelectorAll('[data-a11y-font]').forEach(b => b.classList.toggle('active', b === btn));
      showToast(`Text size set to: ${size.toUpperCase()}`);
    });
  });

  document.getElementById('btn-toggle-contrast')?.addEventListener('click', () => {
    audio.tap();
    appState.accessibility.highContrast = !appState.accessibility.highContrast;
    document.body.classList.toggle('high-contrast', appState.accessibility.highContrast);
    showToast(appState.accessibility.highContrast ? '👁️ High Contrast Mode Enabled' : 'Standard Dark Contrast Restored');
  });

  document.getElementById('btn-toggle-motion')?.addEventListener('click', () => {
    audio.tap();
    appState.accessibility.reducedMotion = !appState.accessibility.reducedMotion;
    document.body.classList.toggle('reduced-motion', appState.accessibility.reducedMotion);
    showToast(appState.accessibility.reducedMotion ? 'Reduced Motion Enabled' : 'Animations Restored');
  });

  document.getElementById('lang-select-dropdown')?.addEventListener('change', (e) => {
    audio.tap();
    const lang = e.target.value;
    appState.accessibility.lang = lang;
    applyLanguage(lang);
  });
}

function applyLanguage(lang) {
  const dict = i18n[lang] || i18n.en;
  const heroTitle = document.getElementById('i18n-hero-title');
  const heroSub = document.getElementById('i18n-hero-sub');
  if (heroTitle) heroTitle.innerHTML = dict.heroTitle;
  if (heroSub) heroSub.innerHTML = dict.heroSub;
  showToast(`Language switched to: ${lang.toUpperCase()}`);
}

function showToast(message) {
  const stack = document.getElementById('toast-stack');
  if (!stack) return;

  const item = document.createElement('div');
  item.className = 'toast-item';
  item.innerHTML = `<span>●</span><span>${message}</span>`;
  stack.appendChild(item);

  setTimeout(() => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(10px)';
    item.style.transition = 'all 0.3s ease';
    setTimeout(() => item.remove(), 300);
  }, 3500);
}

window.closeGenericModal = function() {
  const modal = document.getElementById('generic-info-modal');
  if (modal) modal.classList.add('hidden');
};
