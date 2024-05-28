***A/C***

Must have(s)
[*] Display total number of movies.
[*] Table must show movie title, average review score to 1 decimal place and company that produces the film.
    [*] Movie company data comes from movieCompanies GET request.
    [*] Movies data comes from movies GET request.
[*] User must be able to select table row to leave a review with form appearing when there is a selected movie.
    [*] POST request to submitReview endpoint and display message returned on response.
    [*] Form must restrict message to 100 characters and show an error message if over 100 and not allow for submission in this instance.
[*] Highlight selected movie row when clicked.
[*] Handle error and loading states.

Should have(s)
[*] Review column should be sortable.
[*] Submit review form should appear in a modal on mobile devices or small breakpoints.

Could have(s)
[*] Add a button (or other mechanism) to refresh movies and movie companies.
[] Containerise application using docker.

Engineer Notes

* Due to the relative simplicity of the application, setting up Context and Reducers at this point to manage application state is an unnecessary step.  If expanded, first next step would be to look into a more comprehensive state management setup.
* Styling has been left relatively barren at this juncture, as no design present to work from.  Have implemented closer to mobile first, but would require more design input to be able to develop something meaningful.  Presumably, designs would work to an existing component library.
* Relatively restricted data set, but have tested pagination with manually expanded data return by editing the index before reverting
* Likely needs more expansive error testing, but difficult to test with a local server, and with a basic server
