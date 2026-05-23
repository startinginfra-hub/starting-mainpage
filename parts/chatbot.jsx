// Channel.io chat widget — replace with your Plugin Key from Channel.io admin.

const CHANNEL_PLUGIN_KEY = "c9fcf001-feaf-4bbd-a760-5e89cd042f74";

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

function bootChannel() {
  ensureChannelStub();
  loadChannelScript();
  window.ChannelIO(
    "boot",
    {
      pluginKey: CHANNEL_PLUGIN_KEY,
      language: "ko",
    },
    function onBoot(error) {
      if (error) {
        console.error("[Chatbot] Channel.io boot failed:", error);
        console.info(
          "[Chatbot] 로컬에서 403이면 채널톡 관리자 → 버튼 설치 → 고급 설정 → 화이트리스트에 localhost / 127.0.0.1 을 추가하세요."
        );
        return;
      }
      console.info("[Chatbot] Channel.io boot OK");
    }
  );
}

function Chatbot() {
  React.useEffect(() => {
    if (!CHANNEL_PLUGIN_KEY || CHANNEL_PLUGIN_KEY === "YOUR_PLUGIN_KEY_HERE") {
      console.warn("[Chatbot] Set CHANNEL_PLUGIN_KEY in parts/chatbot.jsx");
      return undefined;
    }

    bootChannel();

    return () => {
      if (window.ChannelIO) window.ChannelIO("shutdown");
    };
  }, []);

  return null;
}
