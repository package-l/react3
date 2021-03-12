import PropTypes from 'prop-types';

export default {
  user: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
  }),
};
