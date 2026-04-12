// youtube-feed.js
const channelID = "UCkYTC6Wdfe56UMGo-AtPacA";
const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelID}`;
const apiEndpoint = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

async function fetchLatestVideo() {
  const container = document.getElementById("latest-video-container");
  if (!container) return;

  try {
    const response = await fetch(apiEndpoint);
    const data = await response.json();

    if (data.status === "ok" && data.items.length > 0) {
      // Pulls the very first item in the feed
      const latestVideo = data.items[0];
      const videoLink = latestVideo.link;
      const videoId =
        latestVideo.guid.split(":")[2] || latestVideo.link.split("v=")[1];

      const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

      // Only injecting the linked image
      container.innerHTML = `
        <div class="video-preview">
          <a href="${videoLink}" target="_blank" rel="noopener">
            <div class="thumb-container">
               <img src="${thumbnail}" alt="Latest Video">
               <div class="play-overlay">▶</div>
            </div>
          </a>
        </div>
      `;
    }
  } catch (error) {
    console.error("YouTube Feed Error:", error);
  }
}

fetchLatestVideo();
