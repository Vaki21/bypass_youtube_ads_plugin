// Create event listener for all link clicks
document.addEventListener('yt-navigate-start', process);
if (document.body)process();
else document.addEventListener('DOMContentLoaded', process);

function process(){
  let aTag = document.querySelectorAll('a');
  aTag.forEach(link => {
    if (link.hasAttribute("pluginEventListenerAdded")) {
      return;
    }
    link.addEventListener('click', (e) => {
      let targetUrl = link.getAttribute("href");
      if ((targetUrl !== null) && (targetUrl.includes("/watch"))) {
        //const currentUrl = window.location.href;
        /*
        fetch("http://localhost:1234/", {
          method: "POST",
          mode: 'no-cors',
          body: JSON.stringify(targetUrl)
        });
        */
        console.log(targetUrl);
      }
    });
    link.setAttribute("pluginEventListenerAdded", "");
  });
}

