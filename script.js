// JavaScript to handle accordion functionality
function toggleAccordion(section) {
    const content = section.nextElementSibling;
    section.parentElement.classList.toggle('active');
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }