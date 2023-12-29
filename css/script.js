// Accordion functionality
function toggleAccordion(section) {
  const content = section.nextElementSibling;
  const isActive = section.parentElement.classList.contains('active');

  section.parentElement.classList.toggle('active', !isActive);

  if (!isActive) {
    content.style.maxHeight = content.scrollHeight + 'px';
  } else {
    content.style.maxHeight = null; // Set to null to collapse content
  }
}


// Finding all classes named "accordion" to apply style
const elements = document.querySelectorAll('.accordion');

// Colors for each elements
const wordsToColor = {
  'Pyro DMG Bonus': '#FF9999',
  'Hydro DMG Bonus': '#80C0FF',
  'Electro DMG Bonus': '#FFACFF',
  'Cryo DMG Bonus': '#99FFFF',
  'Anemo DMG Bonus': '#80FFD7',
  'Dendro DMG Bonus': '#99FF88',
  'Geo DMG Bonus': '#FFE699',
  
  'Pyro DMG': '#FF9999',
  'Hydro DMG': '#80C0FF',
  'Electro DMG': '#FFACFF',
  'Cryo DMG': '#99FFFF',
  'Anemo DMG': '#80FFD7',
  'Dendro DMG': '#99FF88',
  'Geo DMG': '#FFE699',

  'Pyro RES': '#FF9999',
  'Hydro RES': '#80C0FF',
  'Electro RES': '#FFACFF',
  'Cryo RES': '#99FFFF',
  'Anemo RES': '#80FFD7',
  'Dendro RES': '#99FF88',
  'Geo RES': '#FFE699',

  'Pyro Infusion': '#FF9999',
  'Hydro Infusion': '#80C0FF',
  'Electro Infusion': '#FFACFF',
  'Cryo Infusion': '#99FFFF',
  'Anemo Infusion': '#80FFD7',
  'Dendro Infusion': '#99FF88',
  'Geo Infusion': '#FFE699'
  
};

// Apply different colors to the matched words
elements.forEach(element => {
  let text = element.innerHTML;

  // Filter out elements with data-tooltips
  const tooltips = element.querySelectorAll('[data-tooltip]');
  tooltips.forEach(tooltip => {
    const index = Array.from(tooltips).indexOf(tooltip);
    text = text.replace(tooltip.outerHTML, `[${index}]`);
  });

  // Look through each word and apply colors
  Object.entries(wordsToColor).forEach(([word, color]) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    text = text.replace(regex, `<span style="color: ${color}; font-weight: bold">$&</span>`);
  });

  // Replace placeholders with original tooltip content
  tooltips.forEach(tooltip => {
    const index = Array.from(tooltips).indexOf(tooltip);
    text = text.replace(`[${index}]`, tooltip.outerHTML);
  });

  element.innerHTML = text;
});


// Function to cache accordions
function getAccordionElements() {
  return document.querySelectorAll('.accordion');
}

// Search functionality
function searchCharacters() {
  const accordions = getAccordionElements();
  const searchInput = document.getElementById('searchInput');
  const filter = searchInput.value.trim().toUpperCase();

  accordions.forEach((accordion) => {
    const characterName = accordion.querySelector('.accordion-title').innerText.toUpperCase();
    const content = accordion.querySelector('.accordion-content');

    if (filter === '' || characterName.includes(filter)) {
      accordion.style.display = ''; // Show matching accordions

      if (characterName === filter) {
        content.style.maxHeight = content.scrollHeight + 'px'; // Fully expand only the matched accordion
      } else {
        content.style.maxHeight = '0'; // Collapse non-matched accordion content
      }
    } else {
      accordion.style.display = 'none'; // Hide non-matching accordions
      content.style.maxHeight = '0'; // Collapse all non-matching accordion content
    }
  });
}

// Search input field
document.getElementById('searchInput').addEventListener('input', searchCharacters);
