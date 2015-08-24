var React = require('react')
var Router = require('react-router')
var rest = require('rest')

var ArtworkResult = require('./artwork-result')
var SEARCH = require('./search-endpoint')
var SearchResultsA = require('./search-results/a')
var SearchResultsB = require('./search-results/b')
var SearchResultsC = require('./search-results/c')
var SearchResultsD = require('./search-results/d')

var SearchResults = React.createClass({
  mixins: [Router.State],

  statics: {
    fetchData: {
      searchResults: (params, query) => {
        var size = query.size || 100
        const filters = params.splat
        let searchUrl = `${SEARCH}/${params.terms}?size=${size}`
        if(filters) searchUrl += `&filters=${filters}`
        return rest(searchUrl).then((r) => JSON.parse(r.entity))
      }
    }
  },

  getInitialState() {
    var focus = window.clickedArtwork || this.props.hits[0]
    setTimeout(() => window.clickedArtwork = null)

    return {
      focusedResult: focus && focus._source,
      view: SearchResultsD,
    }
  },

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.data.searchResults != nextProps.data.searchResults ||
      this.props.hits != nextProps.hits ||
      this.props.state != nextState
  },

  componentWillReceiveProps(nextProps) {
    this.focusResult(window.clickedArtwork || nextProps.hits[0])
    if(window.clickedArtwork) window.clickedArtwork = null
  },

  render() {
    var search = this.props.data.searchResults
    var results = this.props.hits.map((hit) => {
      var id = hit._source.id.replace('http://api.artsmia.org/objects/', '')
      var focused = this.state.focusedResult === hit._source
      return <div key={id} onClick={this.focusResult.bind(this, hit, SearchResultsB)} className={focused && 'focused'}>
        <ArtworkResult id={id} data={{artwork: hit._source}} />
      </div>
    })
    var {focusedResult} = this.state

    return <div>
      <SearchResultViewToggle 
        click={this.changeView}
        activeView={this.state.view}
        views={[SearchResultsA, SearchResultsB, SearchResultsC, SearchResultsD]}
      />
      <this.state.view
        results={results}
        focusedResult={focusedResult}
        focusHandler={this.focusResult}
        changeView={this.changeView}
        search={search}
        hits={this.props.hits} />
    </div>
  },

  focusResult(hit, nextView = false) {
    nextView && this.changeView(nextView)
    this.setState({focusedResult: hit && hit._source})
  },

  changeView(next) {
    var nextView = next || (this.state.view == SearchResultsA ? SearchResultsB : SearchResultsA)
    this.setState({view: nextView})
  },
})

module.exports = SearchResults

var SearchResultViewToggle = React.createClass({
  render() {
    var {views, click, activeView} = this.props

    var toggles = views.map((r) => {
      var name = r.displayName.replace('SearchResults', '')
      var style={marginRight: '0.25em'}
      if(activeView === r) style.fontWeight = 'bold'
      return <span key={name} onClick={this.toggleView.bind(this, r)} style={style}>{name}</span>
    })
    return <div>{toggles}</div>
  },

  toggleView(view) {
    this.props.click(view)
  },
})
