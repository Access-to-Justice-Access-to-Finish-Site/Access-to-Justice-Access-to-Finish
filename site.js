const pages=[['index.html','Home'],['whro-meeting.html','WHRO Meeting'],['timeline.html','Chronology'],['evidence.html','Evidence Archive'],['beginning.html','Before Western'],['updates.html','Updates']];
const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
if(document.title.includes('Access to Justice: Access to Finish'))document.title=document.title.replace('Access to Justice: Access to Finish','This Could Have Been You');
const nav=pages.map(([href,label])=>`<a href="${href}" ${current===href?`aria-current="page"`:''}>${label}</a>`).join('');
const header=document.querySelector('#site-header');
if(header){header.innerHTML=`<a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="nav-shell"><a class="brand" href="index.html"><strong>This Could Have Been You</strong><span>A story. A record. A way forward.</span></a><button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open navigation">Menu</button><nav id="site-nav" class="nav-links" aria-label="Primary navigation">${nav}</nav></div></header>`;const b=header.querySelector('.nav-toggle'),n=header.querySelector('.nav-links');b?.addEventListener('click',()=>{const open=n.classList.toggle('open');b.setAttribute('aria-expanded',String(open));b.textContent=open?'Close':'Menu';});}
const footer=document.querySelector('#site-footer');
if(footer){footer.innerHTML=`<footer class="site-footer"><div class="footer-inner"><div><div class="smallcaps">This Could Have Been You</div><p>An independent storytelling and advocacy project about education, institutional accountability, and rebuilding beyond barriers.</p></div><div class="footer-links"><a href="beginning.html">Before Law</a><a href="story.html">Story</a><a href="timeline.html">Timeline</a><a href="whro-meeting.html">WHRO Meeting</a><a href="audio.html">Audio Plan</a><a href="evidence.html">Evidence</a><a href="maze.html">The System</a><a href="faq.html">FAQ</a><a href="press.html">Press</a><a href="help.html">Take Action</a><a href="contact.html">Contact</a></div></div><p class="footer-note">Records are contextualized. Allegations and interpretations are not findings of fact. Sensitive source materials remain unpublished pending verification, privacy review, and redaction.</p></footer>`;}

if(/^year-202[0-6]\.html$/.test(current)){
  const mediaStyles=document.createElement('link');
  mediaStyles.rel='stylesheet';
  mediaStyles.href='diary-public-media.css';
  document.head.append(mediaStyles);
  const mediaScript=document.createElement('script');
  mediaScript.src='diary-public-media.js';
  mediaScript.defer=true;
  document.body.append(mediaScript);
}


document.querySelectorAll("audio[data-exclusive-audio]").forEach((player) => {
  player.addEventListener("play", () => {
    document.querySelectorAll("audio[data-exclusive-audio]").forEach((other) => {
      if (other !== player) other.pause();
    });
  });
});
