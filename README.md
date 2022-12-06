# Pokémon App

With the Pokémon App the user can see all the existing Pokémons, can search Pokémon by name and can see some additional details of the selected Pokémon.

## Pages

**Home Page**

Shows the Pokémons by name in alphabetical order \
On one page only 16 Pokémons are visible, users can select the previous or the next page. \
Users can search for Pokémons by name. The search will start after 3 characters will be typed. The list of the Pokémons will update immediately. \
Users can select a Pokémon. After selecting one the app will navigate to the Details page.

**Details Page**

Shows a few extra information about the Pokémon.

- Species
- Weight
- Stats
- Types
- Moves

---

## Implementation

The main approach was to use custom hooks for fetching the datas:

**_usePokemonPesponse_**\
When the application starts getting the name and URL of all Pokémon.

**_usePokémonList_**\
Using the **usePokemonPesponse** the app will fetch the Pokémon images.

Main functionalities:

- Fetching the images of the pokemons by page, then saving data to local storage by page. If the selected page data is already in the cache, it is not necessary to fetch the list again.
- Based on the Pokémon Response it is possible to search Pokémon by name. In this case the data won't be saved in local storage.
- For the pagination the last page will be saved, too.
- Converting the data list for the frontend usage.

**_usePokémonList_**\
Fetching the data by name. Saving the data to local storage. If the selected Pokémon already exists in cache, then getting the data from local storage. The appropiate properties will be converted for the frontend usage.

---

## Future improvements

- Deep linking URL - page & search value
- Go back from Pokémon details page will navigate to the correct page, not the first page
- Advanced pagination - can select specific page
- Cache pokémon images
- Debounce search

---

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
