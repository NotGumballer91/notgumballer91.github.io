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
  'Pyro DMG': '#FF9999',
  'Hydro DMG': '#80C0FF',
  'Electro DMG': '#FFACFF',
  'Cryo DMG': '#99FFFF',
  'Anemo DMG': '#80FFD7',
  'Dendro DMG': '#4BFF19',
  'Geo DMG': '#FFE699',

  'Pyro RES': '#FF9999',
  'Hydro RES': '#80C0FF',
  'Electro RES': '#FFACFF',
  'Cryo RES': '#99FFFF',
  'Anemo RES': '#80FFD7',
  'Dendro RES': '#4BFF19',
  'Geo RES': '#FFE699',

  'Pyro Infusion': '#FF9999',
  'Hydro Infusion': '#80C0FF',
  'Electro Infusion': '#FFACFF',
  'Cryo Infusion': '#99FFFF',
  'Anemo Infusion': '#80FFD7',
  'Dendro Infusion': '#4BFF19',
  'Geo Infusion': '#FFE699',

  'Burning': '#FF9999',
  'Vaporize': '#F6B375',
  'Melt': '#F6B375',
  'Overloaded': '#E5848A',
  'Electro-Charged': '#FFACFF',
  'Superconduct': '#B8ADFA',
  'Frozen': '#99FFFF',
  'Swirl': '#80FFD7',
  'Bloom': '#4BFF19',
  'Dendro-Reaction': '#4BFF19',
  'Spread': '#4BFF19',
  'Crystallize': '#FFE699',

  'Pyro': '#FF9999',
  'Hydro': '#80C0FF',
  'Electro': '#FFACFF',
  'Cryo': '#99FFFF',
  'Anemo': '#80FFD7',
  'Dendro': '#4BFF19',
  'Geo': '#FFE699',
  
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
