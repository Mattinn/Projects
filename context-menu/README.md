# Context Menu

This project implements a custom context menu that appears when right-clicking within a specified area of the webpage. The context menu allows users to select a color, which changes the background color of a container element.

Tested on the latest versions of Chrome, Edge and Firefox.

The JavaScript code for the context menu is located in `scripts.js`. It listens for the `DOMContentLoaded` event to ensure the DOM is fully loaded before attaching event listeners.


## Features
- **Custom Context Menu**: Right-clicking within the `contextArea` displays a custom context menu.
- **Position Adjustment**: The context menu adjusts its position to stay within the viewport.
- **Color Selection**: Clicking a button in the context menu changes the background color of the `container`.
- **Hide on Click Outside**: Clicking outside the context menu hides it.
- **Hide on ESC Key**: Pressing the ESC key hides the context menu.

## How to Run

1. Open `index.html` in a web browser.
2. Right-click within the `contextArea` to display the context menu.
3. Select a color to change the background color of the `container`.

## How to Develop
- Modify the Html/CSS files directly
- To update the JS, make the change in the TS file and run `tsc scripts.ts` to compile a new JS file that the browser loads.
- Refresh the browser to view the changes.


## License

This project is licensed under the MIT License.