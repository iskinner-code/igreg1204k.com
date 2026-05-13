const channelID = "UCkYTC6Wdfe56UMGo-AtPacA";

async function fetchLatestVideo() {
  const container = document.getElementById("latest-video-container");

  if (!container) return;

  try {
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelID}`;

    const response = await fetch(rssUrl);

    const xmlText = await response.text();

    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, "text/xml");

    const firstEntry = xml.querySelector("entry");

    if (!firstEntry) {
      container.innerHTML = "<p>No videos found.</p>";
      return;
    }

    const videoId = firstEntry.querySelector("video\\:videoId").textContent;

    const videoTitle = firstEntry.querySelector("title").textContent;

    const videoLink = `https://www.youtube.com/watch?v=${videoId}`;

    const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    container.innerHTML = `
      <div class="video-preview">
        <a href="${videoLink}" target="_blank" rel="noopener">
          <div class="thumb-container">
            <img src="${thumbnail}" alt="${videoTitle}">
            <div class="play-overlay">▶</div>
          </div>
        </a>
      </div>
    `;
  } catch (error) {
    console.error("YouTube Feed Error:", error);

    container.innerHTML = "<p>Failed to load latest video.</p>";
  }
}

fetchLatestVideo();
