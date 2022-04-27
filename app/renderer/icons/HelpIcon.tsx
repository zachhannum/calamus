import Icon from './Icon';
import { IconProps, IconPropDefaults } from './type';

const HelpIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40ZM21.792 33C22.368 33 22.656 32.744 22.656 32.232V28.296C22.656 27.9547 22.5067 27.784 22.208 27.784H17.824C17.4827 27.784 17.312 27.976 17.312 28.36V32.328C17.312 32.5627 17.3547 32.7333 17.44 32.84C17.5467 32.9467 17.728 33 17.984 33H21.792ZM12.256 14.216C12.2773 14.3653 12.3733 14.4613 12.544 14.504L15.744 15.272C15.936 15.2933 16.0747 15.2933 16.16 15.272C16.2453 15.2293 16.3307 15.1227 16.416 14.952C16.6507 14.4187 16.9707 13.9493 17.376 13.544C17.7813 13.1387 18.2507 12.8293 18.784 12.616C19.3173 12.4027 19.8613 12.296 20.416 12.296C21.2693 12.296 21.984 12.52 22.56 12.968C23.136 13.416 23.424 14.024 23.424 14.792C23.424 15.4107 23.232 15.976 22.848 16.488C22.4853 17 22.0373 17.512 21.504 18.024C20.992 18.536 20.4693 19.1013 19.936 19.72C19.4027 20.3173 18.9547 21.0213 18.592 21.832C18.2293 22.6427 18.048 23.6133 18.048 24.744C18.048 25.2347 18.272 25.48 18.72 25.48H21.344C21.536 25.48 21.6853 25.4267 21.792 25.32C21.92 25.192 21.984 25.0427 21.984 24.872C21.984 23.912 22.1973 23.1013 22.624 22.44C23.0507 21.7787 23.5733 21.1813 24.192 20.648C24.832 20.0933 25.4613 19.5387 26.08 18.984C26.6987 18.4293 27.2213 17.8 27.648 17.096C28.0747 16.392 28.288 15.5387 28.288 14.536C28.288 13.4907 27.9573 12.552 27.296 11.72C26.656 10.8667 25.7493 10.1947 24.576 9.704C23.424 9.192 22.048 8.936 20.448 8.936C18.5067 8.936 16.832 9.36267 15.424 10.216C14.016 11.048 12.9707 12.2427 12.288 13.8C12.2453 13.928 12.2347 14.0667 12.256 14.216Z"
      />
    </Icon>
  );
};

HelpIcon.defaultProps = {
  ...IconPropDefaults,
};

export default HelpIcon;
