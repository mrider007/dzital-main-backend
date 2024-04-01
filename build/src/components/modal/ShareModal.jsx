// import React, { useState } from 'react';
// import { FaShareAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa';

// const ShareModal = ({ isOpen, onClose, onOpenModal }) => {
//   const currentPageUrl = window.location.href;

//   const handleCopyLink = () => {
//     // Attempt to copy the URL to the clipboard
//     navigator.clipboard.writeText(currentPageUrl)
//   };

//   const socialMediaLinks = {
//     facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentPageUrl)}`,
//     twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentPageUrl)}`,
//     linkedin: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(currentPageUrl)}`,
//     instagram: `https://www.instagram.com/?url=${encodeURIComponent(currentPageUrl)}`,
//     whatsapp: `https://www.whatsapp.com/?url=${encodeURIComponent(currentPageUrl)}`,
//   };

//   return (
//     <div className={`modal ${isOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isOpen ? 'block' : 'none' }}>
//       <div className="modal-dialog" role="document">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">Share Link</h5>
//             <button type="button" className="close" onClick={onClose} aria-label="Close">
//               <span aria-hidden="true">&times;</span>
//             </button>
//           </div>
//           <div className="modal-body">
//             <p>Share this link:</p>
//             <input type="text" className="form-control mb-2" value={currentPageUrl} readOnly />
//             <p>Share on:</p>
//             <div className="social-icons">
//               <a href={socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer">
//                 <FaFacebook className="mr-2" />
//               </a>
//               <a href={socialMediaLinks.whatsapp} target="_blank" rel="noopener noreferrer">
//                 <FaWhatsapp className="mr-2" />
//               </a>
//               <a href={socialMediaLinks.linkedin} target="_blank" rel="noopener noreferrer">
//                 <FaLinkedin className="mr-2" />
//               </a>
//               <a href={socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer">
//                 <FaInstagram />
//               </a>
//             </div>
//           </div>
//           <div className="modal-footer">
//             <button type="button" className="btn btn-primary" onClick={handleCopyLink}>
//               Copy Link
//             </button>
//           </div>
//         </div>
//       </div>
//       {/* Share icon */}
//       <div className="share-icon" onClick={onOpenModal}>
//         <FaShareAlt />
//       </div>
//     </div>
//   );
// };

// export default ShareModal;



import React from 'react';
import { FaShareAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const ShareModal = ({ isOpen, onClose, onOpenModal }) => {
  const currentPageUrl = window.location.href ;
  const currentTitle = encodeURIComponent(document.title);

  const handleCopyLink = () => {
    // Attempt to copy the URL to the clipboard
    navigator.clipboard.writeText(currentPageUrl)
      .then(() => {
        // Handle successful copy
      })
      .catch((error) => {
        console.error('Failed to copy link to clipboard:', error);
      });
  };

  const socialMediaLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentPageUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${currentPageUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${currentPageUrl}&title=${currentTitle}`,
    instagram: `https://www.instagram.com/share?url=${currentPageUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${currentPageUrl}`,
  };

  return (
    <div className={`modal ${isOpen ? 'show' : ''} ` } tabIndex="-1" role="dialog" style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Share Link</h5>
            <button type="button" className="close" onClick={onClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Share this link:</p>
            <input type="text" className="form-control mb-2" value={window.location.href} readOnly />
            <p>Share on:</p>
            <div className="social-icons">
              <a href={socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebook className="mr-2" />
              </a>
              <a href={socialMediaLinks.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter className="mr-2" />
              </a>
              <a href={socialMediaLinks.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="mr-2" />
              </a>
              <a href={socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram className="mr-2" />
              </a>
              <a href={socialMediaLinks.whatsapp} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp />
              </a>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={handleCopyLink}>
              Copy Link
            </button>
          </div>
        </div>
      </div>
      {/* Share icon */}
      <div className="share-icon" onClick={onOpenModal}>
        <FaShareAlt />
      </div>
    </div>
  );
};

export default ShareModal;
