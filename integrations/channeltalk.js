// Channel.io integration — do not edit from design workflows.
// UI hooks: data-channel-action="open", data-channel-form="consultation"

(function () {
  const CHANNEL_PLUGIN_KEY = "c9fcf001-feaf-4bbd-a760-5e89cd042f74";
  const CONSULTATION_API_URL = "https://starting-mainpage.vercel.app/api/consultation-notify";
  let booted = false;

  function ensureChannelStub() {
    const w = window;
    if (w.ChannelIO) return;

    const ch = function () {
      ch.c(arguments);
    };
    ch.q = [];
    ch.c = function (args) {
      ch.q.push(args);
    };
    w.ChannelIO = ch;
  }

  function loadChannelScript() {
    const w = window;
    if (w.ChannelIOInitialized) return;

    w.ChannelIOInitialized = true;
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
    const first = document.getElementsByTagName("script")[0];
    if (first?.parentNode) first.parentNode.insertBefore(s, first);
  }

  function callChannelIO() {
    if (window.ChannelIO) {
      window.ChannelIO.apply(window, arguments);
    }
  }

  function boot() {
    if (!CHANNEL_PLUGIN_KEY || CHANNEL_PLUGIN_KEY === "YOUR_PLUGIN_KEY_HERE") {
      console.warn("[ChannelTalk] Set CHANNEL_PLUGIN_KEY in integrations/channeltalk.js");
      return;
    }
    if (booted) return;

    ensureChannelStub();
    loadChannelScript();
    callChannelIO(
      "boot",
      {
        pluginKey: CHANNEL_PLUGIN_KEY,
        language: "ko",
      },
      function onBoot(error) {
        if (error) {
          console.error("[ChannelTalk] Channel.io boot failed:", error);
          console.info(
            "[ChannelTalk] 로컬에서 403이면 채널톡 관리자 → 버튼 설치 → 고급 설정 → 화이트리스트에 localhost / 127.0.0.1 을 추가하세요."
          );
          return;
        }
        booted = true;
        console.info("[ChannelTalk] boot OK");
      }
    );
  }

  function shutdown() {
    if (window.ChannelIO) {
      callChannelIO("shutdown");
      booted = false;
    }
  }

  function openChat() {
    boot();
    callChannelIO("showMessenger");
  }

  function collectFormData(form) {
    const data = {};
    Array.from(form.elements).forEach(function (el) {
      if (!el.name || el.disabled) return;
      if (el.type === "submit" || el.type === "button") return;
      data[el.name] = el.value;
    });
    return data;
  }

  function submitConsultation(data) {
    const company = (data.company || "").trim();
    const email = (data.email || "").trim();
    const role = (data.role || "").trim();

    if (!company) {
      alert("회사명을 입력해주세요.");
      return Promise.resolve(false);
    }

    return fetch(CONSULTATION_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company: company, email: email, role: role }),
    })
      .then(function (res) {
        if (!res.ok) throw new Error("notify failed");
        return res.json();
      })
      .then(function () {
        if (company || email) {
          callChannelIO("updateUser", {
            profile: {
              name: company || undefined,
              email: email || undefined,
              company: company || undefined,
              desiredRole: role || undefined,
            },
          });
        }

        callChannelIO("track", "consultation_request", {
          company: company,
          email: email,
          role: role,
        });

        openChat();
        return true;
      })
      .catch(function (err) {
        console.error("[ChannelTalk] consultation notify failed:", err);
        alert("상담 신청 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.");
        return false;
      });
  }

  function bindEvents() {
    document.addEventListener("click", function (e) {
      const el = e.target.closest('[data-channel-action="open"]');
      if (!el) return;
      e.preventDefault();
      openChat();
    });

    document.addEventListener("submit", function (e) {
      const form = e.target.closest('[data-channel-form="consultation"]');
      if (!form) return;
      e.preventDefault();
      const submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;
      submitConsultation(collectFormData(form)).finally(function () {
        if (submitBtn) submitBtn.disabled = false;
      });
    });
  }

  window.ChannelTalk = {
    boot: boot,
    shutdown: shutdown,
    openChat: openChat,
    submitConsultation: submitConsultation,
  };

  bindEvents();
  boot();
})();
