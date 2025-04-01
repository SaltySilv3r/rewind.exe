# Rewind.exe

## Overview
Rewind.exe is an interactive digital escape room puzzle that immerses players in a nostalgic 90s/early 2000s computing experience. The game simulates a Windows XP-style desktop interface where players navigate retro-themed websites to uncover hidden clues, eventually assembling a password to progress to the next stage of an escape room challenge.

## Description
Players interact with a simulated Windows desktop environment complete with:
- A bootup screen with Windows XP startup animation
- Desktop icons including Recycle Bin, Browser, and a readme.txt file
- Functioning windows that can be dragged, minimized, and closed
- A fully interactive browser experience with navigation controls

The game centers around exploring a series of nostalgic websites themed around early 2000s internet culture:
1. **Battlefield Command Center** - A fan site dedicated to Battlefield 1942
2. **Chaos Theory Forums** - A discussion board for Jurassic Park enthusiasts
3. **The Blair Witch Project** - A fan site for the cult horror film
4. **Password Verification Page** - The final challenge that requires finding the password (good luck!)

## Game Mechanics
- Players must discover hidden URL fragments within each website
- URLs lead to the next website in the sequence
- The final password is derived from clues scattered throughout the websites
- Completing the puzzle triggers a connection to the escape room system via Pusher

## Technical Details
- Built using vanilla HTML, CSS, and JavaScript
- Responsive window management with draggable elements
- Simulated browser with history management and page loading animations
- Integration with Blockbuster challenge system via Pusher
- Cross-site navigation between thematically linked pages
- Interactive elements with subtle visual cues to help guide players

## Installation & Usage
1. Clone the repository
2. Open the index.html file in a modern web browser
3. No external dependencies required for local testing
4. For full escape room integration, Pusher credentials are required

## Project Structure
- **index.html** - Main game interface and HTML structure
- **style.css** - Complete styling for all game elements and websites
- **site.js** - Core game functionality and browser simulation
- **game-connector.js** - Integration with the Blockbuster challenge system
- **images/** - Contains all game graphics and icons

## Authors
**SaltySilv3r**  
Discord: @saltysilv3r

## Acknowledgments
- Inspired by classic Windows operating systems (98/XP/Vista)
- Design aesthetic draws from early 2000s web design and VHS culture
- Thanks to the following projects for README inspiration:
  * [awesome-readme](https://github.com/matiassingers/awesome-readme)
  * [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
  * [dbader](https://github.com/dbader/readme-template)
  * [zenorocha](https://gist.github.com/zenorocha/4526327)
  * [fvcproductions](https://gist.github.com/fvcproductions/1bfc2d4aecb01a834b46)

## License
This project is intended for use in escape room experiences. All rights reserved.
