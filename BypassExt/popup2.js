document.addEventListener('yt-page-data-updated', pauza);
function pauza(event){
  event.stopPropagation();
  if ((document.getElementsByTagName('video')[0])) {
    let video = document.getElementsByTagName('video')[0];
    video.pause();
  }
}