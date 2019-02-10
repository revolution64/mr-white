import React, {Component} from 'react';
import { connect } from 'react-redux';
import MrWhiteContent from '../components/mrWhite/MrWhiteContent';

class Content extends Component {

    getContentComponentBasedOnKey(key) {
        return <MrWhiteContent/>;
    }

    render() {
        const contentToBeShown = this.getContentComponentBasedOnKey(this.props.menu)

        return (
          <div className={'rb-content-container'}>
              {contentToBeShown}
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        menu: state.menu,
    };
};


export default connect(mapStateToProps, null) (Content);
