import Icon from './Icon';
import { IconProps, IconPropDefaults } from './type';

const NewFileIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <g clipPath="url(#clip0_521_2558)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M33.0071 12.8593C33.0086 11.8821 32.6523 10.9381 32.0055 10.2056L24.1914 1.35609C23.4337 0.497993 22.3447 0.00564562 21.2 0.00366545L12.0275 -0.0122009C9.81809 -0.0160228 8.024 1.77223 8.02063 3.98169L7.97941 30.9808C7.97603 33.19 9.76416 34.9836 11.9733 34.9869L22.257 35.0026C22.0906 34.5327 22 34.0269 22 33.5C22 32.975 22.0899 32.4711 22.2551 32.0026L11.9779 31.9869C11.4256 31.9861 10.9786 31.5377 10.9794 30.9854L11.0206 3.98627C11.0215 3.4339 11.47 2.98684 12.0224 2.98779L20 3.00159V11C20 12.933 21.567 14.5 23.5 14.5H30.0046L29.9897 24.2597C30.4618 24.0916 30.9702 24 31.5 24C32.0221 24 32.5234 24.0889 32.9897 24.2524L33.0071 12.8593ZM29.1463 11.5L23 4.53924V11C23 11.2761 23.2239 11.5 23.5 11.5H29.1463Z"
        />
        <path d="M31.5 27C32.3284 27 33 27.6716 33 28.5V32H36.5C37.3284 32 38 32.6716 38 33.5C38 34.3284 37.3284 35 36.5 35H33V38.5C33 39.3284 32.3284 40 31.5 40C30.6716 40 30 39.3284 30 38.5V35H26.5C25.6716 35 25 34.3284 25 33.5C25 32.6716 25.6716 32 26.5 32H30V28.5C30 27.6716 30.6716 27 31.5 27Z" />
      </g>
      <defs>
        <clipPath id="clip0_521_2558">
          <rect width="40" height="40"/>
        </clipPath>
      </defs>{' '}
    </Icon>
  );
};

NewFileIcon.defaultProps = {
  ...IconPropDefaults,
};

export default NewFileIcon;
