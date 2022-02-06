# frontend-language-app

Crowd-sourced Immersive Language Learning App
Course: CS 467
App Name: Locute
Team Members: Karen Black, Danielle DuChene, Gabrielle Josephson, David Ju

Objective:
The goal of this app is to allow two types of users to translate provided scenarios in selected languages. The Content Provider (CP) provides prompt and answer translations (text and audio) of a selected scenario for Languages Learners (LL) to interact with. The Language Learner can read and play scenario prompt translations (provided by the CP) and practice answering the prompts in the selected language via audio recording or text input. The LL’s answer is graded against the CPs answer and a success or failure is reported to the LL.

Flow of the app:
This project starts at the Welcome Screen and allows the user to Log In or Register as a new User. Currently the login/register functionality is not implemented so, pressing either button will proceed to the next page.

The next screen allows the user to participate as a Content Provider or Language Learner. Select either path to continue. The three subsequent screens are similar for both user types, with the final fourth screen being different.

The Languages screen displays a scrollable list of languages to choose from. Select any language to proceed to the next screen.

The Categories screen displays a scrollable list categories to choose from. Select any category to proceed to the next screen.

The Scenarios screen displays a scrollable list of scenarios to translate. The title and prompt of each scenario is displayed. Currently the screen is filled with dummy data because database queries are not yet implemented. So, the displayed scenarios will not match the category selection at the top of the screen.

Translation screen for the Content Provider: Displayed in English are the scenario title, image, prompt, and answer. The blue recording buttons are used to record the CP’s translation and the text boxes are for the written translations. The Submit button will submit all translation data to the database and store the audio files in a cloud storage. However, database queries are not yet implemented.

Translation screen for the Language Learner: Displayed are the scenario title in English, scenario image, translated prompt, and button to play the translation audio recorded by the CP. The LL can choose to record or type their answer in the given language. If the answer is recorded, it will be transcribed directly into text and displayed in the text box. Submit will grade the LL’s answer attempt by comparing to CP’s answer. Show answer will display the answer. Currently, the functionality to play a recording, transcribe speech to text, submit the answer for grading and display the answer are not yet implemented.
