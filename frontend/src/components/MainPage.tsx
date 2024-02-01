import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class MainPage extends PureComponent {
    render() {
        return (
            <div>
                <h1>Main Page</h1>
                <p>Some text</p>
            </div>
        );
    }
}

MainPage.propTypes = {};

export default MainPage;