document.addEventListener('DOMContentLoaded', function () {
    var container = document.getElementById('container');
    var contextArea = document.getElementById('contextArea');
    var contextMenu = document.getElementById('contextMenu');
    var colorPicker = document.getElementById('colorPicker');
    if (contextArea && contextMenu && colorPicker) {
        contextArea.addEventListener('contextmenu', function (event) {
            // Prevent the browser's default right-click behavior
            event.preventDefault();
            // Viewport dimensions
            var viewportWidth = window.innerWidth;
            var viewportHeight = window.innerHeight;
            // Approximate context menu dimensions
            var menuWidth = 100;
            var menuHeight = 180;
            // Click event position
            var clickX = event.clientX;
            var clickY = event.clientY;
            // Adjust menu width if it overflows the right viewport width
            if (clickX + menuWidth > viewportWidth) {
                clickX = viewportWidth - menuWidth;
            }
            // Adjust menu height if overflows the bottom viewport height
            if (clickY + menuHeight > viewportHeight) {
                clickY = viewportHeight - menuHeight;
            }
            // Set the position of the context menu
            contextMenu.style.left = "".concat(clickX, "px");
            contextMenu.style.top = "".concat(clickY, "px");
            // Show the context menu
            contextMenu.style.display = 'block';
        });
        // Clicking outside the context hides the menu
        document.addEventListener('click', function () {
            contextMenu.style.display = 'none';
        });
        // ESC key hides the context menu
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                contextMenu.style.display = 'none';
            }
        });
        // Selecting a color in the context menu
        colorPicker.addEventListener('click', function (event) {
            var target = event.target;
            if (target.tagName === 'BUTTON') {
                var selectedColor = target.getAttribute('data-color');
                // Change the background color of the parent container
                if (selectedColor && container) {
                    container.style.backgroundColor = selectedColor;
                }
                // Hide the context menu after selecting a color
                contextMenu.style.display = 'none';
            }
        });
    }
    else {
        console.warn("Context menu ID elements missing from the DOM");
    }
});
