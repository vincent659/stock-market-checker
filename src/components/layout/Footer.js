import React from "react";

/* Page Footer */
export const Footer = () => {
  return (
    <footer color="blue" className="font-small pt-4 mt-4 text-bottom">
      <div className="footer-copyright text-center py-3">
          &copy; {new Date().getFullYear()} Copyright
      </div>
    </footer>
  );
}
