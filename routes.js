var React = require('react')
var Router = require('react-router')
var {Route, Redirect, DefaultRoute} = Router

var App = require('./src/app')
var Home = require('./src/home')
var Search = require('./src/search')
var SearchResults = require('./src/search-results')
var Artwork = require('./src/artwork')
var ArtistsByLetter = require('./src/artists-by-letter')
var ObjectsById = require('./src/objects-by-id')
var Department = require('./src/department')
var Curator = require('./src/curator')
var Curators = require('./src/curators')
var Explore = require('./src/explore')
var Page = require('./src/page')
var Info = require('./src/info')
var Gallery = require('./src/gallery')
var Map = require('./src/map-page')
var More = require('./src/more')
var Exhibition = require('./src/exhibition')
var Artist = require('./src/artist')
var RecentAccessions = require('./src/recent')
var AccessionHighlight = require('./src/accession-highlight')
var Survey = require('./src/survey')

var routes = (
  <Route handler={App} path="/">
    <DefaultRoute name="home" handler={Home}/>
    <Route name="artwork" path="art/:id" handler={Artwork} />
    <Route name="artworkSlug" path="art/:id/:slug" handler={Artwork} />
    <Route name="accessionHighlight" path="art/:id/:slug/accessionHighlight" handler={AccessionHighlight} />
    <Route name="search" path="/search/" handler={Search}>
      <Route name="searchResults" path=":terms" handler={SearchResults}>
        <Route name="filteredSearchResults" path="filters/*" handler={SearchResults} />
      </Route>
    </Route>
    <Route name="department" path="/departments/:dept" handler={Department} />
    <Route name="curator" path="/curators/:slug" handler={Curator} />
    <Route name="curators" path="/curators" handler={Curators} />
    <Route name="explore" path="/explore" handler={Explore} />
    <Route name="artistsByName" path="/search/artists/:letter" handler={ArtistsByLetter} />
    <Route name="artist" path="/people/:id" handler={Artist} />
    <Route name="artistSlug" path="/people/:id/:slug" handler={Artist} />
    <Route name="objectsById" path="/search/ids/:ids" handler={ObjectsById} />
    <Route name="page" path="/info/:name" handler={Page} />
    <Route name="info" path="/info" handler={Info} />
    <Route name="gallery" path="/galleries/:gallery" handler={Gallery} />
    <Route name="map" path="/map" handler={Map} />
    <Route name="galleries" path="/galleries" handler={Map} />
    <Route name="more" path="/more" handler={More} />
    <Route name="exhibition" path="/exhibitions/:id" handler={Exhibition} />
    <Route name="exhibitionSlug" path="exhibitions/:id/:slug" handler={Exhibition} />
    <Route name="recent" path="/new" handler={RecentAccessions} />
    <Route name="survey" path="survey" handler={Survey} />
  </Route>
);

module.exports = routes
