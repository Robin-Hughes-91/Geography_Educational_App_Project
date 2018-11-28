const PubSub = require('../helpers/pub_sub.js');

const CountryVideoView = function (container) {
  this.container = container;
};

CountryVideoView.prototype.renderVideo = function (country) {

  // console.log('in renderVideo()');
  // create the video element
  // set the source so that it loads the video - hard-code for now
  // create div to act as container for video
  // append the video element to video container
  // const videoContainer = document.createElement('div');
  // const countryVideo = document.createElement('video');
  // countryVideo.src = "https://www.youtube.com/embed/QIcwxy4vJfs"
  // countryVideo.autoplay = true;
  // countryVideo.setAttribute("src", "http://www.metacafe.com/watch/11782691/when-lauren-want-to-visit-the-hospital/");

  // const source = document.createElement('source');
  // source.type = "video/mp4";
  // source.src = "https://www.youtube.com/embed/SFy7leDdI4U";
  // countryVideo.appendChild(source);
  //
  // videoContainer.appendChild(countryVideo);
  // this.container.appendChild(videoContainer);

  const iFrame = document.querySelector('#video-iframe-element');
  iFrame.src = country.video;
  console.log('video', country.video)




  // "https://www.youtube.com/embed/QDbIwaHIiT0"


};




module.exports = CountryVideoView;
