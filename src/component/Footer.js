import React from "react";

function Footer({ hotlink }) {
  const { user, urls, description } = hotlink;

  return (
    <div className="footer">
      {hotlink && (
        <div>
          {description}
          <br></br>
          photo by <a href={urls.raw}>{user.name}</a>
        </div>
      )}
      <div className="copyright">&#169; Josh Zalcman</div>
    </div>
  );
}

export default Footer;
