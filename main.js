// ==========================================================================
// Next-Gen Ad Blocking & Privacy Protection for Chromium - Interactive Engine
// ==========================================================================

// Pre-compiled sample Chrome Manifest V3 declarativeNetRequest rulesets
const RULESET_DATA = {
  easylist: {
    name: "EasyList Standard Advertising Rules",
    ruleCount: "148,920 active rules",
    action: "BLOCK (sub_frame, script, image)",
    sampleJson: [
      {
        "id": 1001,
        "priority": 1,
        "action": { "type": "block" },
        "condition": {
          "urlFilter": "||doubleclick.net^",
          "resourceTypes": ["sub_frame", "script", "xmlhttprequest"]
        }
      },
      {
        "id": 1002,
        "priority": 1,
        "action": { "type": "block" },
        "condition": {
          "urlFilter": "||adservice.google.*^",
          "resourceTypes": ["script", "sub_frame", "image"]
        }
      },
      {
        "id": 1003,
        "priority": 2,
        "action": { "type": "block" },
        "condition": {
          "urlFilter": "||outbrain.com^",
          "resourceTypes": ["sub_frame", "script"]
        }
      }
    ]
  },
  hagezi: {
    name: "HaGeZi Multi PRO++ Blocklists",
    ruleCount: "86,410 active rules",
    action: "BLOCK & SILENT REDIRECT",
    sampleJson: [
      {
        "id": 2001,
        "priority": 3,
        "action": { "type": "block" },
        "condition": {
          "urlFilter": "||telemetry.*.traffic-analytics.io^",
          "resourceTypes": ["ping", "xmlhttprequest", "beacon"]
        }
      },
      {
        "id": 2002,
        "priority": 3,
        "action": { "type": "block" },
        "condition": {
          "urlFilter": "||fingerprint-matrix-cdn.net^",
          "resourceTypes": ["script", "other"]
        }
      },
      {
        "id": 2003,
        "priority": 4,
        "action": {
          "type": "redirect",
          "redirect": { "url": "data:text/javascript;base64,/*neutralized*/" }
        },
        "condition": {
          "urlFilter": "||sdk.splitbee.io/sb.js^",
          "resourceTypes": ["script"]
        }
      }
    ]
  },
  annoyance: {
    name: "Annoyances, Cookie Modals & Newsletters",
    ruleCount: "42,150 active rules",
    action: "BLOCK & COSMETIC COLLAPSE",
    sampleJson: [
      {
        "id": 3001,
        "priority": 1,
        "action": { "type": "block" },
        "condition": {
          "urlFilter": "||onetrust.com/consent/*",
          "resourceTypes": ["script", "xmlhttprequest"]
        }
      },
      {
        "id": 3002,
        "priority": 1,
        "action": { "type": "block" },
        "condition": {
          "urlFilter": "||cookiebot.com/uc.js*",
          "resourceTypes": ["script"]
        }
      },
      {
        "id": 3003,
        "priority": 1,
        "action": { "type": "block" },
        "condition": {
          "urlFilter": "||push-notification-prompt.io/*",
          "resourceTypes": ["script", "websocket"]
        }
      }
    ]
  },
  allowlist: {
    name: "Dynamic Per-Domain Allowlist",
    ruleCount: "User Configurable Dynamic Rule Index",
    action: "ALLOW (Priority Overrides)",
    sampleJson: [
      {
        "id": 9001,
        "priority": 100,
        "action": { "type": "allow" },
        "condition": {
          "initiatorDomains": ["trusted-portal.internal", "localhost"],
          "resourceTypes": ["main_frame", "sub_frame", "script"]
        }
      },
      {
        "id": 9002,
        "priority": 100,
        "action": { "type": "allowAllRequests" },
        "condition": {
          "domains": ["bank-verified-login.com"]
        }
      }
    ]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Elements
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const body = document.body;

  // Modals
  const installModal = document.getElementById("install-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalCancelBtn = document.getElementById("modal-cancel-btn");
  const modalConfirmBtn = document.getElementById("modal-confirm-btn");
  const modalDoneBtn = document.getElementById("modal-done-btn");
  const modalBodyStep1 = document.getElementById("modal-body-step1");
  const modalBodySuccess = document.getElementById("modal-body-success");
  const addBrowserTriggers = document.querySelectorAll(".add-browser-trigger");

  const sourceModal = document.getElementById("source-modal");
  const btnSource = document.getElementById("btn-source");
  const sourceCloseBtn = document.getElementById("source-close-btn");

  // Ruleset Inspector Drawer
  const rulesetDrawer = document.getElementById("ruleset-drawer");
  const drawerCloseBtn = document.getElementById("drawer-close-btn");
  const drawerRulesetName = document.getElementById("drawer-ruleset-name");
  const drawerRuleCount = document.getElementById("drawer-rule-count");
  const drawerActionBadge = document.getElementById("drawer-action-badge");
  const rulesetCodeView = document.getElementById("ruleset-code-view");
  const rulesetItems = document.querySelectorAll(".ruleset-item");


  // Email Copy
  const copyEmailBtn = document.getElementById("copy-email-btn");
  const copyTooltip = document.getElementById("copy-tooltip");

  // ----------------------------------------------------------------------
  // Theme Toggle: Mesh (Original PDF Aesthetic) <-> Dark Mode
  // ----------------------------------------------------------------------
  themeToggleBtn.addEventListener("click", () => {
    if (body.classList.contains("theme-dark")) {
      body.classList.remove("theme-dark");
      body.classList.add("theme-mesh");
      localStorage.setItem("adblock_theme", "mesh");
    } else {
      body.classList.remove("theme-mesh");
      body.classList.add("theme-dark");
      localStorage.setItem("adblock_theme", "dark");
    }
  });

  // Restore saved theme or URL param
  const urlParams = new URLSearchParams(window.location.search);
  const themeParam = urlParams.get("theme");
  const savedTheme = localStorage.getItem("adblock_theme");
  if (themeParam === "dark" || (!themeParam && savedTheme === "dark")) {
    body.classList.remove("theme-mesh");
    body.classList.add("theme-dark");
  } else if (themeParam === "mesh") {
    body.classList.remove("theme-dark");
    body.classList.add("theme-mesh");
  }

  // ----------------------------------------------------------------------
  // "Add to Browser" Modal Logic
  // ----------------------------------------------------------------------
  // "Add to Browser" Modal Logic
  // ----------------------------------------------------------------------
  function openInstallModal() {
    installModal.style.display = "flex";
    modalBodyStep1.style.display = "block";
    modalBodySuccess.style.display = "none";
    document.body.style.overflow = "hidden";
  }

  function closeInstallModal() {
    installModal.style.display = "none";
    document.body.style.overflow = "";
  }

  addBrowserTriggers.forEach(btn => {
    btn.addEventListener("click", openInstallModal);
  });

  modalCloseBtn.addEventListener("click", closeInstallModal);
  modalCancelBtn.addEventListener("click", closeInstallModal);
  if (modalDoneBtn) modalDoneBtn.addEventListener("click", closeInstallModal);

  modalConfirmBtn.addEventListener("click", () => {
    modalConfirmBtn.innerText = "Verifying Engine...";
    modalConfirmBtn.disabled = true;
    setTimeout(() => {
      modalBodyStep1.style.display = "none";
      modalBodySuccess.style.display = "block";
      modalConfirmBtn.innerText = "Install Extension";
      modalConfirmBtn.disabled = false;

      // Update Header Indicator
      const statusLabel = document.querySelector(".status-label");
      if (statusLabel) {
        statusLabel.innerText = "Engine Active (300k Rules)";
      }
    }, 600);
  });

  // Close when clicking modal backdrop
  installModal.addEventListener("click", (e) => {
    if (e.target === installModal) closeInstallModal();
  });

  // ----------------------------------------------------------------------
  // Source Code Modal
  // ----------------------------------------------------------------------
  if (sourceCloseBtn) {
    sourceCloseBtn.addEventListener("click", () => {
      sourceModal.style.display = "none";
      document.body.style.overflow = "";
    });
  }


  sourceModal.addEventListener("click", (e) => {
    if (e.target === sourceModal) {
      sourceModal.style.display = "none";
      document.body.style.overflow = "";
    }
  });

  // ----------------------------------------------------------------------
  // Ruleset Inspector Drawer
  // ----------------------------------------------------------------------
  function showRuleset(key) {
    const data = RULESET_DATA[key];
    if (!data) return;

    drawerRulesetName.innerText = data.name;
    drawerRuleCount.innerText = data.ruleCount;
    drawerActionBadge.innerText = data.action;
    rulesetCodeView.textContent = JSON.stringify(data.sampleJson, null, 2);

    rulesetDrawer.style.display = "block";
    rulesetDrawer.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  rulesetItems.forEach(item => {
    const key = item.getAttribute("data-ruleset");
    item.addEventListener("click", (e) => {
      showRuleset(key);
    });
  });

  drawerCloseBtn.addEventListener("click", () => {
    rulesetDrawer.style.display = "none";
  });



  // ----------------------------------------------------------------------
  // Copy Email to Clipboard
  // ----------------------------------------------------------------------
  copyEmailBtn.addEventListener("click", async () => {
    const email = "devteam.official@myyahoo.com";
    try {
      await navigator.clipboard.writeText(email);
      copyTooltip.classList.add("show");
      setTimeout(() => {
        copyTooltip.classList.remove("show");
      }, 2000);
    } catch (err) {
      // Fallback
      const input = document.createElement("input");
      input.value = email;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      copyTooltip.classList.add("show");
      setTimeout(() => {
        copyTooltip.classList.remove("show");
      }, 2000);
    }
  });

  // ----------------------------------------------------------------------
  // FAQ Accordion Interaction
  // ----------------------------------------------------------------------
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const btn = item.querySelector(".faq-question-btn");
    if (btn) {
      btn.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
        faqItems.forEach(other => {
          other.classList.remove("active");
          const otherBtn = other.querySelector(".faq-question-btn");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        });

        if (!isActive) {
          item.classList.add("active");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    }
  });

  // Keyboard accessibility: ESC key to close open modals or drawers
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeInstallModal();
      sourceModal.style.display = "none";
      rulesetDrawer.style.display = "none";
      document.body.style.overflow = "";
    }
  });
});
