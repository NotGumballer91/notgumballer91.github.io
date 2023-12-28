// JavaScript to handle accordion functionality
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
  'Dendro DMG': '#99FF88',
  'Geo DMG': '#FFE699'
  
};

// Apply different colors to the matched words
elements.forEach(element => {
  let text = element.innerHTML;

  // Look through each word and apply colors
  Object.entries(wordsToColor).forEach(([word, color]) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    text = text.replace(regex, `<span style="color: ${color}; font-weight: bold">$&</span>`);
  });

  element.innerHTML = text;
});

// Function to handle the search functionality
function searchCharacters() {
  const searchInput = document.getElementById('searchInput');
  const filter = searchInput.value.trim().toUpperCase();
  const accordions = document.querySelectorAll('.accordion');

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


// Event listener for the search input field
document.getElementById('searchInput').addEventListener('input', searchCharacters);
