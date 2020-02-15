import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import ReactUtterences from 'react-utterances'
require("core-js/fn/array/find");

import config from "../../../content/meta/config";

const styles = theme => ({
  postComments: {
    margin: "3em 0 0",
    padding: "3em 0 0",
    borderTop: "1px solid #ddd"
  }
});

// const PostComments = props => {
//   const { classes, slug, facebook } = props;

//   return (
//     <div id="post-comments" className={classes.postComment}>
//       <script async src="https://comments.app/js/widget.js?2" data-comments-app-website="4WnwjkGp" data-limit="5"></script>
//     </div>    
//   );
// };

class PostComments extends React.Component {
  componentDidMount() {
    const { utterances } = this.props;

    let script = document.createElement("script");
    let anchor = document.getElementById("post-comments");
    script.setAttribute("src", "https://comments.app/js/widget.js?2");
    script.setAttribute("data-comments-app-website", "4WnwjkGp");
    script.setAttribute("async", true);
    script.setAttribute("data-limit", "5");
    anchor.appendChild(script);
  }

  render() {
    const { classes } = this.props;
    return (
      <div id="post-comments" className={classes.postComments}></div>
    );
  }
};

PostComments.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  facebook: PropTypes.object.isRequired
};

export default injectSheet(styles)(PostComments);
