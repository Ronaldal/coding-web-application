# Online coding web application

online coding web application in react and js
This web application facilitates remote coding sessions between mentors and students, allowing real-time collaboration and observation of code changes. The frontend is built with React, and the backend is implemented in JavaScript.It consists of two main pages:

1.**Lobby Page:**
   - Displays a title "Choose code block" and a list of code blocks.
   - Each code block represents a coding exercise.
   - Clicking on a code block directs the user to the respective code block page with details.

2.**Code Block Page:**

   - Accessed by both mentors and students (two different clients).
   - Mentor view: Displays the selected code block in read-only mode.
   - Student view: Allows the student to modify the code.
   - Real-time code changes via Socket communication.
   - Syntax highlighting using CodeMirror.
