/*  VIDEO Group


*/

var viddom = {
  screen:'video-screen',
  gallery:{
    list:'video-gallery-buttons',
    button:'video-button',
    selected:'video-button-selected'
  }
}

var vidgroup = {
  'What to Expect':{//Pre Service Call
    src:'https://player.vimeo.com/progressive_redirect/playback/786659113/rendition/720p/file.mp4?loc=external&signature=91579120ceea0ca7df5a522cc6a52640ea08b530930a281ae092c7cf6bb883f7'
  },
  'Rewards Membership':{//Rewards Membership
    src:'https://player.vimeo.com/progressive_redirect/playback/786659197/rendition/720p/file.mp4?loc=external&signature=58dfdaf68f80b3c11dbcc2a46a62ae91cc9b7b502a61c546fa2ca116ec1dd6f7'
  },
  'Service Warranty':{//Service Warranty
    src:'https://player.vimeo.com/progressive_redirect/playback/786659230/rendition/720p/file.mp4?loc=external&signature=2c09bf3ede3445f96ee19a682cadf8a64a241879bef99bcca3de37d2e9d2664d'
  },
  'Repair or Replace? No Remorse.':{//Repair or Replace, No Remorse
    src:'https://player.vimeo.com/progressive_redirect/playback/786659164/rendition/720p/file.mp4?loc=external&signature=f3a52e40ec17348c0ab65d3bd68de19bfd8181970d7852d2230c33a2eb2f0c13'
  },
  'Upgrading Your Air':{//Pre Comfort Consultation
    src:'https://player.vimeo.com/progressive_redirect/playback/786659255/rendition/720p/file.mp4?loc=external&signature=e1ef05ab00f5bf548f20f5aa8d6ec478f32e855bdd1dcd881cba59bd1905c212'
  }
}

var SETvideogallery = ()=>{
  let vgal = document.getElementById(viddom.gallery.list);

  for(let v in vidgroup){
    let vbutt = document.createElement('div');
    vbutt.classList.add(viddom.gallery.button);
    vbutt.addEventListener('click',GETgalleryvideo);
    vbutt.innerText = v;
    vgal.appendChild(vbutt);
  }
}

var GETgalleryvideo = (ele)=>{
  RESETgallerybuttons();
  for(let v in vidgroup){
    if(ele.target.innerText == v){
      document.getElementById(viddom.screen).src = vidgroup[v].src;
      ele.target.classList.add(viddom.gallery.selected);
      return null;
    }
  }
}
var RESETgallerybuttons = ()=>{
  let gallery = document.getElementsByClassName(viddom.gallery.button);
  for(let x=0;x<gallery.length;x++){
    if(gallery[x].classList.contains(viddom.gallery.selected)){
      console.log(33);
      gallery[x].classList.remove(viddom.gallery.selected);
      return null;
    }
  }
}

//Setup gallery
document.getElementById(viddom.screen).src = vidgroup['What to Expect'].src;

SETvideogallery();
