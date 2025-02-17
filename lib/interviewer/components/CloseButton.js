import { motion } from 'motion/react';
import Icon from '~/lib/ui/components/Icon';

const CloseButton = (props) => (
  <motion.div
    id="close-button"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    style={{ cursor: 'pointer' }}
    {...props}
  >
    <Icon name="close" />
  </motion.div>
);

export default CloseButton;
