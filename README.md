## TRAVEL BUG
##### Team members: Anita, Ehelsan, Emma, Kelvin

For our final project, we decided to create a web application, Travel Bug, that will enable users to view travel restrictions to potential holiday destinations, so they are able to make informed choices regarding future trips.

It uses:
- [Express](https://expressjs.com/) web framework for Node.js.
- [Nodemon](https://nodemon.io/) to reload the server automatically.
- [Handlebars](https://handlebarsjs.com/) to render view templates.
- [Mongoose](https://mongoosejs.com) to model objects in MongoDB.
- [ESLint](https://eslint.org) for linting.
- [Jest](https://jestjs.io/) for testing.
- [Cypress](https://www.cypress.io/) for end-to-end testing.
- [API](https://www.gov.uk/api/content/foreign-travel-advice) for fetching GOVUK data.


### User Stories


#### Explore

```
As a global jetsetter
So that I can travel quarantine free regardless of vaccination status
I want to see a list of countries on the green list
```

```
As a global jetsetter
So that I can travel and quarantine at home
I want to see a list of countries on the amber/amber plus list
```

```
As a global jetsetter
So that I can travel anywhere
I want to see a list of countries on the red list
```

#### Profile

```
As a prospective traveller
So that I can use travel bug
I would like to be able to sign up
```

```
As a travel bug user
So that I can view my user profile
I would like to sign in
```

```
As a travel bug user
So that I can change my travel bug username
I would like to edit my profile username
```

```
As a travel bug user
So that I can add my vaccination status
I would like to save my vaccination status to my profile
```

```
As a travel bug user
So that I can update my vaccination status
I would like to update my vaccination status on my profile
```

```
As a travel bug user
So that I can personalise my user profile
I want to be able to set my profile picture
```

```
As a travel bug user
So that I am able to view my profile page details
I want to see my username, profile picture & vaccination status
```

#### Search

```
As a global jetsetter
So that I can see what destinations are available to me
I want to see a list of all possible destinations for UK tourists
```

```
As a travel bug user
So that I can travel quarantine free
I want to see a list of my top five recommended destinations
```

```
As a travel bug user
So that I can easily view my favourite places
I want to set and see a list of my favourite destinations
```

```
As an unvaccinated user
So that I do not have to quarantine
I want to see a list of countries on the green list
```

```
As an unvaccinated user
So that I can travel without paid quarantine
I want to see a list of countries on the green, amber/amber plus lists
```

```
As an unvaccinated user
So that I can travel anywhere
I want to see a list of countries on the green, amber and red lists
```

```
As a vaccinated user
So that I do not have to quarantine
I want to see a list of countries on the green and amber lists
```

```
As a vaccinated user
So that I can travel without paid quarantine
I want to see a list of countries on the green, amber and amber plus lists
```

```
As a vaccinated user
So that I can travel anywhere
I want to see a list of countries on the green, amber and red lists
```
