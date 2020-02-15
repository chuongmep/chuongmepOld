import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import FacebookProvider, { Comments } from "react-facebook";
require("core-js/fn/array/find");

import config from "../../../content/meta/config";

const styles = theme => ({
  postComments: {
    margin: "3em 0 0",
    padding: "3em 0 0",
    borderTop: "1px solid #ddd"
  }
});

const PostComments = props => {
  const { classes, slug, facebook } = props;

  return (
    <div id="post-comments" className={classes.postComments}>
      <script src="https://utteranc.es/client.js"
              repo="chuong9x/comment"
              issue-term="og:title"
              theme="github-light"
              crossorigin="anonymous"
              async>
      </script>
    </div>
  );
};

PostComments.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  facebook: PropTypes.object.isRequired
};

export default injectSheet(styles)(PostComments);
