# CF Calendar

CF Calendar Front end demo using [Mentor's Agenda
](https://cfcalendar.docs.apiary.io/).

___
## Before Start

Run `npm i` or `npm ci` to install the packages.

___

## Available Scripts

`npm start`

Will Start the applcation in port 3000

`npm test`

Will run the tests

___
## Notes

- Application home page (http://localhost:3000/) will contian the quick start and each will describe the application functionality.

- Assumed [Mentor's Agenda
](https://cfcalendar.docs.apiary.io/) contains all the occupied/unavailable slots. These records cannot be booked by the Student through the calendar.

- Student/User will see the converted date and time values according to the browser's timezone using `moment` 

- For this demo I have used local storage as the database.

- Tests are included inside `__test__` directories on each component and I have used `TZ=UTC` as a env when running tests.

- There will be 24 time slots for each day and I have used hour as the label.

- Used a simple responsive design using simple css.

- Added code comments where it needs improvements and has assumptions.