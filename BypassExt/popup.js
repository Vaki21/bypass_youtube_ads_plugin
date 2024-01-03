// Create event listener for all link clicks
//document.addEventListener('yt-page-data-updated', process);
//if (document.body)process;
//else document.addEventListener('DOMContentLoaded', process);
process();

function process(){
  if (typeof AllaTags != 'undefined') {
    console.log("kokot");
  }else{
    console.log("Loaded");
    let AllaTags = document.querySelectorAll('a');
    let prevTargerUrl = ""; 
    AllaTags.forEach(link => {
      if (link.hasAttribute("pluginEventListenerAdded")) {
        return;
      }
      link.addEventListener('click', (event) => {
        let targetUrl = link.getAttribute("href");
        targetUrl = targetUrl.slice(targetUrl.indexOf('/watch'));
        //console.log(document.querySelectorAll('a[href="' + targetUrl + '"]')[0]);
        if ((targetUrl !== null) && (targetUrl.includes("/watch"))) {
          if (link.getElementsByClassName("ytp-time-duration")[0] != undefined) {
            let time = link.getElementsByClassName("ytp-time-duration")[0].innerHTML.trim();
            targetUrl = targetUrl.split("&list", 1)[0];
            if (prevTargerUrl == targetUrl) {
              return;
            }
            console.log(time + " Main");
            //postLink(time, targetUrl);
            prevTargerUrl = targetUrl;
          }else if((link.getElementsByClassName("ytp-time-duration")[0] == undefined)){
            if (prevTargerUrl == targetUrl) {
              return;
            }
            let targetUrl2 = "/watch?" + targetUrl.slice(targetUrl.indexOf('v=')).slice(0, 13);
            let targetClear = targetUrl.slice(targetUrl.indexOf('v=')).slice(0, 13);
            let time = "";
            if ((document.querySelectorAll('a[href*="' + targetClear + '"]')[0].querySelector('div#time-status span[id="text"]') != undefined)) {//pro normal videa
              //time = link.getElementsByTagName("span")[0].innerHTML.trim();
              time = document.querySelectorAll('a[href*="' + targetClear + '"]')[0].querySelector('div#time-status span[id="text"]').innerHTML.trim();
              console.log(time);
            }else if (document.querySelectorAll('a[href="' + targetUrl2 + '"]')[0] != undefined){ //pro next in queue mimo playlist
              time = document.querySelectorAll('a[href="' + targetUrl2 + '"]')[0].querySelector('div#time-status span[id="text"]').innerHTML.trim();
              console.log(time);
            }else if (document.querySelectorAll('a[href*="' + targetClear + '"]')[1].querySelector('div#time-status span[id="text"]') != undefined){//pro playlist i nextqueue
              time = document.querySelectorAll('a[href*="' + targetClear + '"]')[1].querySelector('div#time-status span[id="text"]').innerHTML.trim();
              console.log(time);
            }else{
              time = 0;
              console.log(time);
            }
            //console.log(targetUrl2);
            //postLink(time, targetUrl2);
            prevTargerUrl = targetUrl;
          }
          abortLink;
        }
      });
      targetUrl = null;
      link.setAttribute("pluginEventListenerAdded", "");
    });
  }
}
if (controller = undefined) {
  const controller = new AbortController();
  const signal = controller.signal; 
}

function postLink(time, targetUrl) {
  time = time.replaceAll(':', '');
  console.log(time);
  if (time < 1530) {
    fetch("http://localhost:1234/", {
      method: "POST",
      mode: 'no-cors',
      body: JSON.stringify(targetUrl),
      cache: "no-cache",
      signal: signal
    });
  }                    
}

function abortLink() {
  console.log("Now aborting");
  controller.abort();
}
