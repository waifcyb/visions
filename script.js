document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const previewPane = document.getElementById("preview-pane")
  const divider = document.getElementById("divider")
  const gridContainer = document.getElementById("grid-container")
  const imageGrid = document.getElementById("image-grid")
  const previewImage = document.getElementById("preview-image")
  const noImageMessage = document.getElementById("no-image-message")
  const refreshButton = document.getElementById("refresh-button")

  // State
  let isDragging = false
  let selectedImageId = null

  // Mock imageData (replace with actual data loading)
  const imageData = [
    { id: 1, path: "images/image1.jpg", basename: "image1.jpg" },
    { id: 2, path: "images/image2.jpg", basename: "image2.jpg" },
    { id: 3, path: "images/image3.jpg", basename: "image3.jpg" },
  ]

  // Initialize the grid
  function initializeGrid() {
    // Clear the grid
    imageGrid.innerHTML = ""

    if (!imageData || imageData.length === 0) {
      imageGrid.innerHTML = '<div class="empty-grid-message">No images found in the images folder.</div>'
      return
    }

    // Populate the grid with images
    imageData.forEach((image) => {
      const gridItem = document.createElement("div")
      gridItem.className = "grid-item"
      gridItem.dataset.id = image.id

      const img = document.createElement("img")
      img.src = image.path
      img.alt = image.basename
      img.className = "grid-image"

      gridItem.appendChild(img)
      imageGrid.appendChild(gridItem)

      // Add click event
      gridItem.addEventListener("click", () => selectImage(image))
    })

    // Select the first image by default
    if (imageData.length > 0) {
      selectImage(imageData[0])
    }
  }

  // Select an image
  function selectImage(image) {
    // Update selected state
    selectedImageId = image.id

    // Update grid item selection
    document.querySelectorAll(".grid-item").forEach((item) => {
      if (Number.parseInt(item.dataset.id) === selectedImageId) {
        item.classList.add("selected")
      } else {
        item.classList.remove("selected")
      }
    })

    // Update preview
    previewImage.src = image.path
    previewImage.alt = image.basename
    previewImage.style.display = "block"
    noImageMessage.style.display = "none"
  }

  // Divider drag functionality
  divider.addEventListener("mousedown", (e) => {
    e.preventDefault()
    isDragging = true
    divider.classList.add("dragging")
  })

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return

    const container = document.querySelector(".finder-window")
    const containerRect = container.getBoundingClientRect()
    const containerHeight = containerRect.height
    const mouseY = e.clientY - containerRect.top

    // Calculate percentage (constrain between 20% and 90%)
    const newHeightPercent = Math.min(90, Math.max(20, (mouseY / containerHeight) * 100))

    // Update heights
    previewPane.style.height = `${newHeightPercent}%`
    gridContainer.style.height = `calc(${100 - newHeightPercent}% - 4px)`
  })

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false
      divider.classList.remove("dragging")
    }
  })

  // Refresh button
  refreshButton.addEventListener("click", () => {
    window.location.reload()
  })

  // Initialize the grid on load
  initializeGrid()
})

