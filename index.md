---
layout: default
---

<div class="container">
  <div class="finder-window">
    <!-- Finder-like title bar -->
    <div class="title-bar">
      <div class="window-controls">
        <div class="control red"></div>
        <div class="control yellow"></div>
        <div class="control green"></div>
      </div>
      <h1 class="window-title">Image Viewer</h1>
      <button id="refresh-button" class="refresh-button">Refresh</button>
    </div>

    <!-- Main content area -->
    <div class="content-area">
      <!-- Preview pane -->
      <div id="preview-pane" class="preview-pane">
        <div class="preview-container">
          <img id="preview-image" src="/placeholder.svg" alt="Preview" class="preview-image">
          <div id="no-image-message" class="no-image-message">No image selected</div>
        </div>
      </div>

      <!-- Resizable divider -->
      <div id="divider" class="divider"></div>

      <!-- Image grid -->
      <div id="grid-container" class="grid-container">
        <div id="image-grid" class="image-grid">
          <!-- Images will be loaded here dynamically -->
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  // Jekyll-generated image data
  const imageData = [
    {% for image in site.static_files %}
      {% if image.path contains '/images/' %}
        {
          id: {{ forloop.index }},
          path: "{{ image.path }}",
          name: "{{ image.name }}",
          basename: "{{ image.basename }}"
        }{% unless forloop.last %},{% endunless %}
      {% endif %}
    {% endfor %}
  ];
</script>

<script src="{{ '/script.js' | relative_url }}"></script>

