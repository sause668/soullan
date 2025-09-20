import "./Footer.css";


function Footer() {

  const links = {
    linkedIn: 'https://www.linkedin.com/in/kamara-reynolds-41248686/',
    gitHub: 'https://github.com/sause668',
    soulSites: 'https://www.soulsitescoding.com/'
  }

  const handleLinkButton = (link) => {
    window.location.href = link;
  }

  return (
    <div id="footerCon">
      <div id="aboutConF">
        <h3 id="aboutTitleF">About: </h3>
        <button onClick={()=> handleLinkButton(links.linkedIn)}>LinkdIn</button>
        <button onClick={()=> handleLinkButton(links.gitHub)}>GitHub</button>
      </div>
      <button id="soulSiteBtn" onClick={()=> handleLinkButton(links.soulSites)}><h3 id="tag">Soul Sites</h3></button>
    </div>
  );
}

export default Footer;