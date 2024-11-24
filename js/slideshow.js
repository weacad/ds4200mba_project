let currentViz = 0;

function showVisualization(index) {
  const visualizations = document.querySelectorAll('.visualization');
  visualizations.forEach((viz, i) => {
    viz.style.display = (i === index) ? 'block' : 'none';
  });
}

function nextVisualization() {
  const totalVisualizations = document.querySelectorAll('.visualization').length;
  currentViz = (currentViz + 1) % totalVisualizations;
  showVisualization(currentViz);
}

function prevVisualization() {
  const totalVisualizations = document.querySelectorAll('.visualization').length;
  currentViz = (currentViz - 1 + totalVisualizations) % totalVisualizations;
  showVisualization(currentViz);
}

showVisualization(0);
