// document.addEventListener('DOMContentLoaded', () => {
//   fetch('stories.json')
//       .then(response => response.json())
//       .then(stories => {
//           const storiesContainer = document.getElementById('stories-container');
//           stories.forEach(story => {
//               const storyElement = document.createElement('div');
//               storyElement.className = 'story';
//               storyElement.innerHTML = `
//                   <h3>${story.petName} (Adopted in ${story.yearOfAdoption})</h3>
//                   <img src="${story.imgUrl}" alt="${story.petName}" style="width:200px; height:auto;">
//                   <p>${story.story}</p>
//               `;
//               storiesContainer.appendChild(storyElement);
//           });
//       })
//       .catch(error => console.error('Error loading stories:', error));
// });
document.addEventListener('DOMContentLoaded', () => {
  fetch('stories.json')
      .then(response => response.json())
      .then(stories => {
          const storiesContainer = document.getElementById('stories-container');
          stories.forEach(story => {
              const storyCard = document.createElement('div');
              storyCard.className = 'story-card';

              storyCard.innerHTML = `
                  <div class="story-header">
                      <h3>${story.petName}</h3>
                      <span class="year">Adopted in ${story.yearOfAdoption}</span>
                  </div>
                  <img src="${story.imgUrl}" alt="${story.petName}" class="story-img">
                  <p class="story-text">${story.story}</p>
              `;
              storiesContainer.appendChild(storyCard);
          });
      })
      .catch(error => console.error('Error loading stories:', error));
});

