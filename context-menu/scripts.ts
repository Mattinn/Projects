document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const contextArea = document.getElementById('contextArea');
    const contextMenu = document.getElementById('contextMenu');
    const colorPicker = document.getElementById('colorPicker');

    if (contextArea && contextMenu && colorPicker) {
        contextArea.addEventListener('contextmenu', (event: MouseEvent) => {
            // Prevent the browser's default right-click behavior
            event.preventDefault();

            // Viewport dimensions
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Approximate context menu dimensions
            const menuWidth = 100;
            const menuHeight = 180;

            // Click event position
            let clickX = event.clientX;
            let clickY = event.clientY;

            // Adjust menu width if it overflows the right viewport width
            if (clickX + menuWidth > viewportWidth) {
                clickX = viewportWidth - menuWidth;
            }
            // Adjust menu height if overflows the bottom viewport height
            if (clickY + menuHeight > viewportHeight) {
                clickY = viewportHeight - menuHeight;
            }

            // Set the position of the context menu
            contextMenu.style.left = `${clickX}px`;
            contextMenu.style.top = `${clickY}px`;
            // Show the context menu
            contextMenu.style.display = 'block';
        });
        // Clicking outside the context hides the menu
        document.addEventListener('click', () => {
            contextMenu.style.display = 'none';
        });
        // ESC key hides the context menu
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                contextMenu.style.display = 'none';
            }
        });
        // Selecting a color in the context menu
        colorPicker.addEventListener('click', (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            
            if (target.tagName === 'BUTTON') {
                const selectedColor = target.getAttribute('data-color');
                
                // Change the background color of the parent container
                if (selectedColor && container) {
                    container.style.backgroundColor = selectedColor;
                }
        
                // Hide the context menu after selecting a color
                contextMenu.style.display = 'none';
            }
        });
    } else {
        console.warn("Context menu ID elements missing from the DOM")
    }
});