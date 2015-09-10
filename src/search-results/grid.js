var React = require('react')
var Router = require('react-router')

var ImageQuilt = require('../image-quilt')
var ArtworkImage = require('../artwork-image')
var FocusedResult = require('./focused.js')

var SearchResultsGrid = React.createClass({
  mixins: [Router.Navigation],

  render() {
    var {hits, leftColumnWidth, focusedResult, focusHandler, ...focusedProps} = this.props
    var targetHeight = hits.length < 20 ? 250 : 150
    var quilt = <ImageQuilt artworks={hits}
      maxRows={1000}
      rowHeight={targetHeight}
      maxRowHeight={500}
      onClick={this.clickResult}
      disableHover={true} />
    var wrappedQuilt = !focusedResult ?
      quilt :
      <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: leftColumnWidth}}>
        {quilt}
      </div>

    return <div style={{position: 'relative'}}>
      {wrappedQuilt}
      {focusedResult && <FocusedResult art={focusedResult} {...this.props}/>}
    </div>
  },

  clickResult(art) {
    art && this.props.focusHandler(art)
  },
})

module.exports = SearchResultsGrid