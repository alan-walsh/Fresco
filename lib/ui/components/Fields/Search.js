import { noop } from 'es-toolkit';
import { get, isEmpty } from 'es-toolkit/compat';
import { X as ClearIcon, Search as SearchIcon } from 'lucide-react';
import PropTypes from 'prop-types';
import { getCSSVariableAsString } from '../../utils/CSSVariables';
import Text from './Text';

const Search = (props) => {
  const color = getCSSVariableAsString('--nc-input-text');

  const hasValue = !isEmpty(get(props, ['input', 'value'], ''));

  const onChange = get(props, ['input', 'onChange'], noop);

  const handleClear = () => {
    onChange('');
  };

  const adornmentLeft = color && <SearchIcon style={{ color }} />;

  const adornmentRight = color && hasValue && (
    <ClearIcon
      style={{
        color,
        cursor: 'pointer',
      }}
      onClick={handleClear}
    />
  );

  return (
    <Text
      adornmentLeft={adornmentLeft}
      adornmentRight={adornmentRight}
      {...props} // eslint-disable-line react/jsx-props-no-spreading
      type="search"
    />
  );
};

Search.propTypes = {
  input: PropTypes.object,
};

export default Search;
