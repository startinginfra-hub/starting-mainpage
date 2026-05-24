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
          const host = window.location.hostname;
          const status = error && error.status;
          const type = error && error.type;

          if (status === 403 || type === "constraintUrlError") {
            console.info(
              "[ChannelTalk] 이 URL은 채널톡 화이트리스트에 없습니다: " + host +
                "\n채널톡 관리자 → 설정 → 채널 설정 → 일반 → 플러그인 관리 → 웹 → 고급 설정 → URL 화이트리스트에 아래를 추가하세요:" +
                "\n  • starting-mainpage.vercel.app" +
                "\n  • localhost" +
                "\n  • 127.0.0.1"
            );
          } else if (status === 401 || type === "unauthenticatedError") {
            console.info(
              "[ChannelTalk] plugin key 인증에 실패했습니다. 채널톡 관리자에서 plugin key를 확인하거나 재발급하세요."
            );
          }
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
    const name = (data.name || "").trim();
    const phone = (data.phone || "").trim();
    const email = (data.email || "").trim();
    const role = (data.role || "").trim();

    if (!company) {
      alert("회사명을 입력해주세요.");
      return Promise.resolve(false);
    }
    if (!name) {
      alert("담당자 이름을 입력해주세요.");
      return Promise.resolve(false);
    }
    if (!phone) {
      alert("담당자 전화번호를 입력해주세요.");
      return Promise.resolve(false);
    }

    return fetch(CONSULTATION_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company: company, name: name, phone: phone, email: email, role: role }),
    })
      .then(function (res) {
        if (!res.ok) throw new Error("notify failed");
        return res.json();
      })
      .then(function () {
        if (company || email || name) {
          callChannelIO("updateUser", {
            profile: {
              name: name || company || undefined,
              email: email || undefined,
              mobileNumber: phone || undefined,
              company: company || undefined,
              desiredRole: role || undefined,
            },
          });
        }

        callChannelIO("track", "consultation_request", {
          company: company,
          name: name,
          phone: phone,
          email: email,
          role: role,
        });

        alert("정상적으로 발송이 성공했으며, 영업일 기준 1일 이내 연락드리도록 하겠습니다.");
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
      submitConsultation(collectFormData(form))
        .then(function (ok) {
          if (ok) form.reset();
        })
        .finally(function () {
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
