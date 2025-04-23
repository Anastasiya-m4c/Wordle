Welcome Anastasiya McAvoy,

## Code Institute - Milestone project 1: User-Centric Frontend Development
## WORDLER

### About


View live website [HERE](https://anastasiya-m4c.github.io/Wordle/)

![image from am I responsive to demonstrate responsiveness on the site in all screen sizes](//assets/images/amiresponsive.png)

## Table Of Contents:
1. [Design & Planning](#design-&-planning)
    * [User Stories](#user-stories)
    * [Wireframes](#wireframes)
    * [Typography](#typography)
    * [Colour Scheme](#colour-scheme)

2. [Features](#features)
    * [In Game Functions](#in-game-functions)

3. [Technologies Used](#technologies-used)
4. [Testing](#testing)
5. [Bugs](#bugs)
6. [Deployment](#deployment)
7. [Credits](#credits)

## Design & Planning:  

### User Stories  
### 1. User Story: Guess the word
**As a user,**  
As a player, I want to enter a five-letter word,
**So that I can** 
try to guess the daily puzzle.

### 2. User Story: User feedback
**As a user,**  
I want feedback on each letter after a guess,  
**So that I can** see which letters are correct, incorrect, or misplaced.  

### 3. User Story: Game limits
**As a user,**  
I want to have only six attempts
**So that the game** remains challenging and fair. 

### 4. User Story: Dynamic messaging
**As a user,**  
I want to be notified when I guess the correct word
**So that I can** celebrate my win. 

### 5. User Story: Auto refresh
**As a user,**  
I want the puzzle to reset each day with a new word
**So that i can** play daily and stay engaged.

### 6. User Story: User feedback
**As a user,**  
I want to receive in the moment feedback when the word is not valid or not long enough
**So that I can** correct my mistake and continue playing. 


### Future developments
**On-Screen Keyboard Integration**
**Objective:**
- Enhance accessibility and user experience by providing an interactive on-screen keyboard.
**User Story:**
- As a player, I want access to an on-screen keyboard that reflects the current state of the game (e.g., used, correct, incorrect letters), so that I can more easily input guesses—especially on mobile or touch-screen devices.

**Welcome Modal & Onboarding Experience**
**Objective:**
- Introduce new players to the game with a brief, intuitive onboarding flow that outlines the basic rules and mechanics.

**User Story:**
- As a first-time player, I want to see a welcome modal with a brief explanation of the game, so that I can understand how to play and feel confident before making my first guess.

### Wireframes
This game consists of a simple 5x6 grid and does not require a wireframe. 

### Typography
The font was intentionally selected to align with the visual style of the popular word game Wordle, so that it's instantly recognised and familiar to players.

## Features:
Wordelle is a browser-based, daily 5-letter word guessing game that challenges players to crack a new word puzzle every day. Inspired by the mechanics of popular word game, players have six attempts to guess the secret word of the day. Each guess provides color-coded feedback, guiding players closer to the answer while testing their vocabulary and deduction skills.

With a clean input-based interface, lively feedback messages, and real dictionary validation, "Daily Word Dash" offers a fun, witty, and interactive way to flex your word skills—one day at a time.

### In game functions 
- 🔁 Daily Word Logic
A different word is chosen every day using the current date.
30 predefined 5-letter words cycle throughout the year.
- 🔠 Game Grid
A 6-row by 5-column input grid where players enter their guesses.
Each input is limited to a single character to mimic real letter placement.
- 🎯 Guess Validation
Words must be real English words (validated using a dictionary API).
Invalid entries trigger a humorous modal message.
- 🌈 Color-Coded Feedback
Green: Correct letter in the correct position.
Yellow: Correct letter, wrong position.
Gray: Letter not in the word at all.
- 💬 Dynamic Messaging
Custom congratulatory or fail messages based on game outcome.
Adds a touch of humor and personality to each session.
- ⌨️ Keyboard Interaction
Supports full keyboard controls:
Type letters to fill tiles.
Enter to submit.
Backspace to delete.
- 🚫 Game State Handling
Once the correct word is guessed or attempts run out, inputs and the submit button are disabled to prevent further interaction.
- 📱 Responsive Input Behavior
Auto-focus shifts across input boxes as you type or delete letters.
Only the current row is editable, preserving game progression.
- 🧩 User Experience Touches
Bootstrap modal integration for feedback.
Clear accessibility consideration with aria-labels for tiles.
Automatically highlights the correct word or end-of-game result.

### Languages Used
- HTML - To create a basic site structure.
- CSS - To create custom styles.
- JS - To build a fully responsive game.
- Bootstrap - For consistent styling and improved responsiveness. 

### Frameworks Libraries and Programmes Used
- Font Awesome - for icons.
- Favicon.io - to create a favicon.
- Colormind.io - to create a colour scheme.
- Google Fonts - for custom font size that fits with the of the industry.
- GitHub - to create board, host repository & deploy site.
- GitPod - to develop project and organise version control.
- Devtools - for debugging and adjusting layouts.
- Lighthouse - for testing especially performance related issues.
- Wave evaluation tool - for any accessibility related issues.
- Chat GPT - for generating site content. 
- Voiceover - for acesibility testing. 
- axe DevTools - for any accessibility related issues.

## Testing
The site has been tested fully by viewing pages and clicking the links manually in a number of different browsers as well as with a use of assisted tools like dev tools and lighthouse, code checker, wave plug in.

### Google's Lighthouse Performance
lighthouse performance has been tested on a chromebook and varies much depending on the device tested on and internet speed. Overall performance passed with no failures and showing green results especially on web some mobile results are in high amber, images have been converted to webp, optimised and resized to minimise any performance issues. Some future adjustments can be made but are outside the scope of this project and are mostly due to the imported code like bootstrap and google fonts.  

Results:

### Browser Compatibility
Manuall testing performed on safri, firefox, chrome and edge browsers. As well as iOS and adroind mobile phone devices. No issues flagged. 
Browsers used

### Responsiveness
iPhone SE  


Serface pro 7    


Nest hub MAX   


### Code Validation
Validation completed vith no errors.  
CCS 
JS linter 
HTML

### Manual Testing user stories or/and features


### Accessibility 
Colours have been chosen to comply with accessibility contrast standards and tested by using WAVE plug in on chrome.  

Accessibility tested via Wave & axe DevTools plug ins as well as manual voice over testing.

## Bugs  
*Issue*: site.manifest file error in dev tools - failed to load resource: the server responded with a status of 404 ()  
*Cause*: broken file path, needed help of a tutor to understand the error.  
*Solution*: Updated to a relative file path.  

No outstanding bugs.

## Deployment
#### Creating Repository on GitHub
1. First make sure you are signed into [Github](https://github.com/) and go to the code institutes template, which can be found [here](https://github.com/Code-Institute-Org/gitpod-full-template).
2. Then click on **use this template** and select **Create a new repository** from the drop-down. Enter the name for the repository and click **Create repository from template**.
3. Once the repository was created, I clicked the green **gitpod** button to create a workspace in gitpod so that I could write the code for the site.
  
#### Deploying on Github
The site was deployed to Github Pages using the following method:
1. Go to the Github repository.
2. Navigate to the 'settings' tab.
3. Using the 'select branch' dropdown menu, choose 'main'.
4. Click 'save'.

## Credits
### Special thanks: 
**David Bowers** 
**Marco**  
**Kyle**  

### List of used resources:
   


------
