// NAV BAR LOGIC //
const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");

menu.addEventListener("click", function () {
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
});
// NAV BAR LOGIC //



// EXPERIENCE SECTION TABS LOGIC // 
const tabs = document.querySelectorAll('.work__tab1 input[type="radio"], .work__tab2 input[type="radio"], .work__tab3 input[type="radio"]');
const tabContents = document.querySelectorAll('.tab-content');

const activeTabs = new Set();
let timeoutId;

tabs.forEach((tab, index) => {
  tab.addEventListener('change', () => {
    const nextContent = tabContents[index];

    if (!activeTabs.has(nextContent)) {
      activeTabs.add(nextContent); // Add the tab to the activeTabs set
      fadeIn(nextContent); // Fade in the selected tab content immediately
      tab.checked = false;
    } else {
      activeTabs.delete(nextContent); // Remove the tab from the activeTabs set
      fadeOut(nextContent, 500); // Fade out the tab content
      tab.checked = false;
    }

    if (timeoutId) {
      clearTimeout(timeoutId); // Clear the previous timeout
    }

    timeoutId = setTimeout(() => {
      if (activeTabs.size > 2) {
        activeTabs.forEach(activeTab => {
          if (activeTabs.size > 2) {
            fadeOut(activeTab, 1000); // Fade out other active tabs after 2 seconds
            activeTabs.delete(activeTab); // Remove the tab from the activeTabs set
          }
        });
      }
    }, 7000); // Delay the fade-out by 7 seconds
  });
});

function fadeOut(element, duration) {
  let opacity = 1;
  const interval = 10; // Interval for updating the opacity (in milliseconds)
  const decrement = interval / duration;

  const fade = setInterval(() => {
    opacity -= decrement;
    element.style.opacity = opacity.toString();

    if (opacity <= 0) {
      element.style.opacity = '0';
      element.style.display = 'none';
      clearInterval(fade);
    }
  }, interval);
}

function fadeIn(element) {
  element.style.opacity = '0';
  element.style.display = 'block';

  let opacity = 0;
  const duration = 1000; // Duration for the fade-in animation (in milliseconds)
  const interval = 10; // Interval for updating the opacity (in milliseconds)
  const increment = interval / duration;

  const fade = setInterval(() => {
    opacity += increment;
    element.style.opacity = opacity.toString();

    if (opacity >= 1) {
      element.style.opacity = '1';
      clearInterval(fade);
    }
  }, interval);
}
// EXPERIENCE SECTION TABS LOGIC //



// PROJECT SECTION POPUP LOGIC //
const popups = document.querySelectorAll('.popup');

// Add click event listeners to open popups
document.querySelectorAll('.proj').forEach((item, index) => {
  item.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default anchor tag behavior
    document.body.classList.add('popup-open');
    popups[index].style.display = 'block';
  });
});

// Add click event listeners to close popups
document.querySelectorAll('.close').forEach((closeBtn, index) => {
  closeBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    document.body.classList.remove('popup-open');
    popups[index].style.display = 'none';
  });
});

// Add click event listener to close popups when clicking outside the popup
document.addEventListener('click', (event) => {
  const clickedElement = event.target;

  // Check if the clicked element or its parent is outside any of the popups
  const isOutsidePopups = Array.from(clickedElement.closest('.popup')).every((popup) => !popups.includes(popup));

  if (isOutsidePopups) {
    popups.forEach((popup) => {
      document.body.classList.remove('popup-open');
      popup.style.display = 'none';
    });
  }
});
// PROJECT SECTION POPUP LOGIC //



// ABOUT PAGE IMAGES/TEXT LOGIC //
document.addEventListener('DOMContentLoaded', function() {
  const overlayClass = 'about-overlay';
  const textClass = 'about-text';

  document.addEventListener('click', function(event) {
    const clickedElement = event.target;
    const abimg = clickedElement.closest('.abimg');

    if (!abimg) {
      const overlays = document.querySelectorAll('.' + overlayClass);
      overlays.forEach(function(overlay) {
        overlay.style.display = 'none';
        overlay.querySelectorAll('.' + textClass).forEach(function(paragraph) {
          paragraph.style.opacity = '0';
        });
      });
      return;
    }

    const overlay = abimg.querySelector('.' + overlayClass);
    const paragraphs = overlay.querySelectorAll('.' + textClass);
    let currentIndex = 0;

    if (clickedElement.classList.contains(overlayClass)) {
      hideParagraphs();
      return;
    }

    if (clickedElement.classList.contains('ab-cover-img')) {
      event.preventDefault();
      event.stopPropagation();

      if (overlay.style.display === 'block') {
        hideParagraphs();
      } 
      
      else {
        // displays block, but to display gradually
        overlay.style.display = 'block';
        // set only first paragraph to 1, rest set to 0
        currentIndex = 0;
        paragraphs.forEach(function(paragraph, index) {
          paragraph.style.opacity = index === currentIndex ? '1' : '0';
        });
        currentIndex++;
        // proceed with showing remaining paragraphs as normal
        setTimeout(showNextParagraph, 500);
      }
    }

    function showNextParagraph() {
      if (currentIndex < paragraphs.length) {
        paragraphs[currentIndex].style.opacity = '1';
        currentIndex++;
        setTimeout(showNextParagraph, 500);
      }
    }

    function hideParagraphs() {
      currentIndex = paragraphs.length - 1;
      hideNextParagraph();
    }

    function hideNextParagraph() {
      if (currentIndex >= 0) {
        paragraphs[currentIndex].style.opacity = '0';
        currentIndex--;
        setTimeout(hideNextParagraph, 100);
      } else {
        overlay.style.display = 'none';
      }
    }
  });
});
// ABOUT PAGE IMAGES/TEXT LOGIC //

window.addEventListener('scroll', function() {
  var footer = document.querySelector('.footer');
  var scrollToTop = document.querySelector('.scroll-to-top');
  var footerRect = footer.getBoundingClientRect();
  
  if (footerRect.top <= window.innerHeight && footerRect.bottom >= 0) {
    scrollToTop.classList.add('active');
  } else {
    scrollToTop.classList.remove('active');
  }
});

document.querySelector('.scroll-to-top').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

